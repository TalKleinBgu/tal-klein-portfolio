"""Create the portfolio island terrain in Blender and export a compact GLB.

Run with:
  blender --background --python scripts/build_island_blender.py

The website uses Three.js r128 with a small GLB reader, so this scene is kept
to one mesh and two vertex-coloured material primitives (meadow and rock).
"""
import bpy
import math
import os
import random
from mathutils import Vector

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(ROOT, "assets")
os.makedirs(ASSETS, exist_ok=True)
BLEND_PATH = os.path.join(ASSETS, "portfolio-island.blend")
GLB_PATH = os.path.join(ASSETS, "island-terrain.glb")

bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete(use_global=False)
for datablocks in (bpy.data.meshes, bpy.data.materials, bpy.data.curves):
    pass

def material(name, color):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*color, 1)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (*color, 1)
    bsdf.inputs["Roughness"].default_value = 0.92
    color_node = mat.node_tree.nodes.new("ShaderNodeVertexColor")
    color_node.layer_name = "Color"
    mat.node_tree.links.new(color_node.outputs["Color"], bsdf.inputs["Base Color"])
    return mat

grass = material("Meadow | vertex-painted fescue", (0.28, 0.48, 0.22))
rock = material("Coastal limestone | layered sandstone", (0.47, 0.38, 0.28))
verts, faces, face_materials, vertex_colors = [], [], [], []

def rgb(r, g, b):
    return (max(0, min(1, r)), max(0, min(1, g)), max(0, min(1, b)), 1)

def color_noise(x, y, scale=1):
    return (math.sin(x * 9.17 + y * 3.13) * 0.42 +
            math.sin(x * 2.7 - y * 7.1) * 0.28 +
            math.sin(x * 21.3 + y * 18.4) * 0.15) * scale

def add_vertex(co, color):
    verts.append(co)
    vertex_colors.append((*color, 1) if len(color) == 3 else color)
    return len(verts) - 1

def coast_radius(a):
    return 11.65 * (1 + 0.028 * math.sin(a * 5 + 0.6) +
                    0.018 * math.sin(a * 9 - 1.1) + 0.012 * math.cos(a * 13))

# Dense radial landscape: buildings and roads remain on a stable center plateau;
# the outer park has a few broad, natural rolls instead of a raised lump.
segments, rings = 240, 52
surface = []
for ri in range(rings + 1):
    t = ri / rings
    row = []
    for si in range(segments):
        a = 2 * math.pi * si / segments
        radius = t * coast_radius(a)
        edge = max(0, min(1, (radius - 6.8) / 4.7))
        broad = (0.075 * math.sin(a * 3 + radius * 0.56) +
                 0.045 * math.sin(a * 6 - radius * 0.28) +
                 0.025 * math.cos(a * 11 + radius * 0.6)) * edge
        fine = color_noise(math.cos(a) * radius, math.sin(a) * radius, 0.018) * edge
        z = 0.38 + broad + fine
        x, y = math.cos(a) * radius, math.sin(a) * radius
        n = (math.sin(x * .55 + y * .3) + math.sin(y * .42 - x * .25)) * .018 - edge * 0.025
        row.append(add_vertex((x, y, z), rgb(0.30 + n, 0.50 + n, 0.24 + n * 0.65)))
    surface.append(row)

for ri in range(rings):
    for si in range(segments):
        sn = (si + 1) % segments
        a, b, c, d = surface[ri][si], surface[ri][sn], surface[ri + 1][si], surface[ri + 1][sn]
        # Counter-clockwise from above so the meadow normals point skyward.
        faces.extend(((a, c, b), (b, c, d)))
        face_materials.extend((0, 0))

# Carved, irregular cliff band with a warm exposed rock seam and a darkened toe.
cliff_rings, cliff = 26, []
for ri in range(cliff_rings + 1):
    t = ri / cliff_rings
    row = []
    for si in range(segments):
        a = 2 * math.pi * si / segments
        top = coast_radius(a)
        wave = math.sin(a * 5 + .6) * .33 + math.sin(a * 9 - 1.1) * .2 + math.cos(a * 13) * .12
        bottom = 10.15 + wave * .58
        radius = top * (1 - t) + bottom * t + math.sin(t * math.pi) * wave * .18
        x, y = math.cos(a) * radius, math.sin(a) * radius
        z = 0.35 - t * 1.78 + math.sin(a * 8 + t * 9) * .075 * t
        grain = color_noise(x * .9, y * 1.1 + t * 1.8, .12)
        stratum = math.sin(z * 13 + math.sin(a * 5) * .5) * .045
        toe = max(0, (-z - .72) / 1.15)
        row.append(add_vertex((x, y, z), rgb(.52 + grain + stratum - toe * .06,
                                            .43 + grain + stratum - toe * .06,
                                            .33 + grain * .65 + stratum - toe * .045)))
    cliff.append(row)
for ri in range(cliff_rings):
    for si in range(segments):
        sn = (si + 1) % segments
        a, b, c, d = cliff[ri][si], cliff[ri][sn], cliff[ri + 1][si], cliff[ri + 1][sn]
        faces.extend(((a, c, b), (b, c, d)))
        face_materials.extend((1, 1))

# Rounded boulders are faceted from dense ico-spheres, embedded into the cliff
# edge so the shoreline silhouette feels hand-shaped rather than cylindrical.
random.seed(72)
def add_rock(center, scale, seed):
    random.seed(seed)
    rings_n, seg_n = 10, 16
    rows = []
    for ri in range(rings_n + 1):
        phi = math.pi * ri / rings_n
        row = []
        for si in range(seg_n):
            theta = 2 * math.pi * si / seg_n
            wobble = 1 + 0.075 * math.sin(theta * 3 + seed) * math.sin(phi * 4 + seed * .1)
            x = center[0] + scale[0] * math.sin(phi) * math.cos(theta) * wobble
            y = center[1] + scale[1] * math.sin(phi) * math.sin(theta) * wobble
            z = center[2] + scale[2] * math.cos(phi) * wobble
            shade = color_noise(x * .8 + seed, y * .7, .075)
            row.append(add_vertex((x, y, z), rgb(.54 + shade, .45 + shade, .35 + shade * .7)))
        rows.append(row)
    for ri in range(rings_n):
        for si in range(seg_n):
            sn = (si + 1) % seg_n
            faces.extend(((rows[ri][si], rows[ri + 1][si], rows[ri][sn]),
                          (rows[ri][sn], rows[ri + 1][si], rows[ri + 1][sn])))
            face_materials.extend((1, 1))

for i in range(42):
    a = 2 * math.pi * (i + .18 * math.sin(i * 7.3)) / 42
    radius = 11.75 + .16 * math.sin(i * 4.1)
    size = .75 + (i * 7 % 5) * .10 + random.random() * .12
    add_rock((math.cos(a) * radius, math.sin(a) * radius, -.42 + .09 * math.sin(i * 2.7)),
             (size * 1.05, size * .88, size * .63), i + 20)

# Architectural kit. Every element is real low-poly geometry with baked vertex
# color, so the result stays crisp in the lightweight Three.js renderer.
def box(cx, cy, cz, sx, sy, sz, color, yaw=0, mat=1):
    start = len(verts)
    for x, y, z in ((-1,-1,-1),(1,-1,-1),(1,1,-1),(-1,1,-1),
                    (-1,-1,1),(1,-1,1),(1,1,1),(-1,1,1)):
        xx, yy = x*sx/2, y*sy/2
        verts.append((cx + xx*math.cos(yaw)-yy*math.sin(yaw),
                      cy + xx*math.sin(yaw)+yy*math.cos(yaw), cz + z*sz/2))
        vertex_colors.append((*color, 1) if len(color) == 3 else color)
    local = ((0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7))
    for f in local:
        faces.append(tuple(start + i for i in f))
        face_materials.append(mat)

def roof_panel(cx, cy, cz, length, depth, thickness, tilt, yaw, color):
    start=len(verts)
    for x,y,z in ((-1,-1,-1),(1,-1,-1),(1,1,-1),(-1,1,-1),
                  (-1,-1,1),(1,-1,1),(1,1,1),(-1,1,1)):
        lx=x*length/2; ly=y*depth/2; lz=z*thickness/2
        rx=lx*math.cos(tilt)+lz*math.sin(tilt)
        rz=-lx*math.sin(tilt)+lz*math.cos(tilt)
        verts.append((cx+rx*math.cos(yaw)-ly*math.sin(yaw),
                      cy+rx*math.sin(yaw)+ly*math.cos(yaw),cz+rz))
        vertex_colors.append((*color,1) if len(color)==3 else color)
    for f in ((0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)):
        faces.append(tuple(start+i for i in f)); face_materials.append(1)

def sphere(cx, cy, cz, sx, sy, sz, color, steps=2):
    start = len(verts)
    rings_n, seg_n = 8, 12
    rows = []
    for ri in range(rings_n+1):
        phi = math.pi*ri/rings_n
        row=[]
        for si in range(seg_n):
            th=2*math.pi*si/seg_n
            fac=1 + .035*math.sin(th*3+cx*2)*math.sin(phi*4+cy)
            row.append(add_vertex((cx+sx*math.sin(phi)*math.cos(th)*fac,
                                   cy+sy*math.sin(phi)*math.sin(th)*fac,
                                   cz+sz*math.cos(phi)*fac), color))
        rows.append(row)
    for ri in range(rings_n):
        for si in range(seg_n):
            sn=(si+1)%seg_n
            faces.extend(((rows[ri][si], rows[ri+1][si], rows[ri][sn]),
                          (rows[ri][sn], rows[ri+1][si], rows[ri+1][sn])))
            face_materials.extend((1,1))

def triangle(points, color, mat=1):
    ids=[add_vertex(point,color) for point in points]
    faces.append(tuple(ids)); face_materials.append(mat)

def window(cx, front, cz, w=.48, h=.62, lit=False, yaw=0):
    # Cream stone reveal, deep charcoal frame, blue glass, and proper mullions.
    box(cx, front, cz, w+.14, .10, h+.14, rgb(.85,.83,.74),yaw)
    box(cx, front+.057, cz, w, .045, h, rgb(.075,.12,.14),yaw)
    box(cx, front+.083, cz, w-.075, .025, h-.075,
        rgb(.70,.66,.47) if lit else rgb(.27,.46,.52),yaw)
    box(cx, front+.101, cz, .045, .022, h-.08, rgb(.12,.20,.22),yaw)
    box(cx, front+.101, cz, w-.08, .022, .045, rgb(.12,.20,.22),yaw)

def building(center, width, depth, floors, height, facade, label, roof_color=(.19,.24,.29),
             yaw=0, window_color=None, columns=4, roof_type="flat"):
    cx, cy = center
    basez=.38
    box(cx,cy,basez+.12,width+.35,depth+.35,.24,rgb(.72,.66,.55),yaw)
    # Subtle layered masonry courses, with colored brick accents on the front.
    box(cx,cy,basez+.22+height/2,width,depth,height,facade,yaw)
    for floor in range(floors+1):
        zz=basez+.22+height*(floor/floors)
        box(cx,cy,zz,width+.15,depth+.15,.09,rgb(.78,.72,.62),yaw)
    # Individually staggered masonry blocks add readable scale around openings.
    front=depth/2+.035
    for row in range(max(4,round(height/.18))):
        local_z=basez+.33+row*.18
        offset=.13 if row%2 else 0
        for col in range(max(5,round(width/.31))):
            local_x=-width/2+.15+col*.31+offset
            if local_x > width/2-.08: continue
            wx=cx+local_x*math.cos(yaw)-front*math.sin(yaw)
            wy=cy+local_x*math.sin(yaw)+front*math.cos(yaw)
            shade=((row*13+col*7)%5)*.014
            box(wx,wy,local_z,.28,.028,.12,
                rgb(facade[0]+shade,facade[1]+shade,facade[2]+shade),yaw)
    floors_z=[basez+.55+height*(i+.45)/floors for i in range(floors)]
    for fz in floors_z:
        for col in range(columns):
            local_x=-width*.39 + (width*.78)*(col/max(1,columns-1))
            front=depth/2+.03
            x=cx+local_x*math.cos(yaw)-front*math.sin(yaw)
            wy=cy+local_x*math.sin(yaw)+front*math.cos(yaw)
            if abs(x-cx)<.38 and fz < basez+1.25:
                # Deep framed entrance and transom.
                dx=cx-front*.0; dy=cy+depth/2+.09
                box(dx,dy,basez+.85,.9,.17,1.2,rgb(.77,.72,.63),yaw)
                box(dx,dy+.1,basez+.83,.66,.045,.96,rgb(.24,.39,.43),yaw)
                continue
            window(x,wy,fz,.50,min(.67,height/floors*.72),False,yaw)
    # Carefully layered flat roof or gabled barn silhouette.
    if roof_type == "gable":
        eave=basez+.22+height
        rise=.66
        slope_len=math.hypot(width/2+.13,rise)
        tilt=math.atan2(rise,width/2+.13)
        roof_panel(cx-width*.25,cy,eave+rise/2,slope_len,depth+.32,.16,-tilt,yaw,roof_color)
        roof_panel(cx+width*.25,cy,eave+rise/2,slope_len,depth+.32,.16,tilt,yaw,roof_color)
        # Contrasting fascia and gable-end triangle.
        box(cx,cy+depth/2+.035,eave+rise*.34,width-.12,.07,rise*.68,facade,yaw)
    else:
        box(cx,cy,basez+.27+height,width+.42,depth+.42,.18,rgb(.76,.72,.64),yaw)
        deckz=basez+.38+height
        box(cx,cy,deckz,width+.18,depth+.18,.12,roof_color,yaw)
        tile_colors=[rgb(roof_color[0]+d,roof_color[1]+d,roof_color[2]+d) for d in (-.025,0,.025)]
        for row in range(max(3,round(depth/.27))):
            for col in range(max(4,round(width/.34))):
                lx=-width/2+.19+col*.34+(.16 if row%2 else 0)
                ly=-depth/2+.18+row*.27
                if lx>width/2-.05 or ly>depth/2-.05: continue
                wx=cx+lx*math.cos(yaw)-ly*math.sin(yaw)
                wy=cy+lx*math.sin(yaw)+ly*math.cos(yaw)
                box(wx,wy,deckz+.075,.30,.23,.024,tile_colors[(row+col)%3],yaw)
    # Plaque is intentionally blank; interactive web labels remain the source of text.
    if label:
        box(cx,cy+depth/2+.18,basez+.52,.82,.06,.30,rgb(.07,.18,.23),yaw)
    return (basez+.22+height)

# Main research HQ, in the visual center: layered brick wings, rooftop planters,
# and the dense regular windows that give the reference its architectural rhythm.
top=building((-.2,1.2),3.5,2.5,3,2.85,rgb(.58,.29,.19),"Research",(.19,.23,.30),yaw=.18,columns=7)
for x in (-1.05,.95):
    box(x,1.95,top+.18,.68,.52,.35,rgb(.46,.34,.23))
    sphere(x,1.95,top+.55,.38,.32,.34,rgb(.25,.49,.25))
box(-.2,2.45,top+.35,1.25,.82,.50,rgb(.28,.46,.50),yaw=.18)

# BGU academic hall: pale sandstone, dark pitched roof, entry, and corner towers.
top=building((-4.2,-5.4),3.7,2.2,2,2.15,rgb(.70,.53,.34),"BGU",(.18,.22,.28),yaw=.32,columns=4,roof_type="gable")
for x in (-5.68,-2.72):
    box(x,-5.4,2.45,.8,.30,2.5,rgb(.68,.50,.31),yaw=.32)
    box(x,-5.4,3.78,.30,.36,.72,rgb(.87,.82,.70),yaw=.32)
    box(x,-5.4,4.4,.22,.30,.68,rgb(.66,.47,.27),yaw=.32)
box(-4.2,-4.20,2.40,.74,.17,.92,rgb(.30,.47,.50),yaw=.32)
box(-4.2,-4.03,3.30,.66,.12,.58,rgb(.05,.16,.26),yaw=.32)
# Blue-and-maize crest above the academic entrance.
box(-4.2,-4.20,3.68,1.06,.16,.74,rgb(.035,.13,.25),yaw=.32)
box(-4.2,-4.31,3.70,.20,.05,.40,rgb(.97,.66,.09),yaw=.32)
box(-4.2,-4.31,3.53,.45,.05,.09,rgb(.97,.66,.09),yaw=.32)

# Builder's Git studio: charcoal masonry base, roof terrace, glass wall and canopy.
building((-7.4,-.4),3.0,2.5,2,2.35,rgb(.20,.23,.24),"",(.11,.15,.18),yaw=.08,columns=3)
box(-7.4,-.4,3.34,3.28,2.72,.16,rgb(.12,.17,.20),yaw=.08)
for x in (-8.3,-7.4,-6.5):
    window(x,.4,1.16,.58,.70)
    window(x,.4,2.25,.58,.70)
box(-7.4,.57,1.0,.94,.12,.92,rgb(.93,.92,.86))
box(-7.4,.66,1.0,.66,.06,.64,rgb(.07,.08,.08))
box(-7.4,.72,3.48,2.7,.10,.055,rgb(.50,.57,.58))
# GitHub mark: dark cat silhouette on an ivory plaque above the front entry.
box(-7.4,.96,2.45,.82,.13,.82,rgb(.94,.94,.90))
sphere(-7.4,1.045,2.43,.27,.065,.27,rgb(.035,.045,.045))
sphere(-7.4,1.06,2.22,.20,.06,.20,rgb(.035,.045,.045))
triangle([(-7.60,1.05,2.58),(-7.56,1.05,2.83),(-7.43,1.05,2.64)],rgb(.035,.045,.045))
triangle([(-7.37,1.05,2.64),(-7.24,1.05,2.83),(-7.20,1.05,2.58)],rgb(.035,.045,.045))

# Dairy barn and open paddock. There is no wording on the farm; cows are the focus.
barn_top=building((6.6,-4.0),3.5,2.55,1,1.8,rgb(.58,.25,.17),"",(.20,.21,.22),yaw=-.12,columns=3,roof_type="gable")
box(6.6,-2.65,1.09,1.05,.08,1.28,rgb(.23,.13,.10),yaw=-.12)
for x in (5.25,7.95):
    window(x,-2.69,1.15,.48,.48,True)
# Low timber paddock fence around the grazing area.
for i in range(9):
    x=4.2+i*.55
    box(x,-1.65,.77,.075,.075,.64,rgb(.39,.25,.14))
for z in (.65,1.0): box(6.4,-1.65,z,4.55,.08,.09,rgb(.52,.34,.19))
for i in range(3):
    x=5.35+i*.86
    sphere(x,-.6,.93,.40,.24,.28,rgb(.90,.88,.81))
    sphere(x+.28,-.57,1.02,.15,.17,.16,rgb(.13,.14,.15))
    sphere(x-.12,-.78,.78,.07,.07,.28,rgb(.17,.16,.15))
    sphere(x+.18,-.78,.78,.07,.07,.28,rgb(.17,.16,.15))
    sphere(x+.30,-.64,1.08,.13,.13,.13,rgb(.88,.83,.77))

# Guide-dog cottage, flower borders and fenced play yard.
building((6.5,1.2),2.7,2.15,2,2.0,rgb(.65,.39,.24),"",(.23,.26,.30),yaw=.12,columns=3,roof_type="gable")
for i in range(7):
    x=4.3+i*.62
    box(x,3.15,.70,.08,.08,.48,rgb(.39,.28,.18))
for z in (.70,.96): box(6.16,3.15,z,3.9,.07,.07,rgb(.53,.35,.19))
for x in (4.7,5.3,5.9,6.5,7.1,7.7):
    sphere(x,2.9,.58,.12,.11,.12,rgb(.86,.30,.40))
# Puppy silhouette with warm coat, white chest and ears.
sphere(6.1,2.42,.77,.36,.50,.39,rgb(.75,.47,.25))
sphere(6.1,2.78,1.05,.28,.28,.29,rgb(.80,.56,.34))
sphere(5.88,2.78,1.15,.12,.12,.19,rgb(.35,.23,.17))
sphere(6.32,2.78,1.15,.12,.12,.19,rgb(.35,.23,.17))
box(6.1,2.36,.89,.40,.16,.19,rgb(.16,.33,.56))

# Red-brick studio/store on the right, with a glass ground floor.
building((6.35,4.15),2.85,2.3,3,2.75,rgb(.62,.25,.16),"",(.20,.24,.30),yaw=-.08,columns=4)
box(6.35,5.42,1.14,1.65,.16,.40,rgb(.035,.12,.17))
box(6.35,5.53,1.14,1.42,.08,.23,rgb(.10,.57,.67))

# Communication lookout and antenna array behind the central district.
building((1.4,-6.6),1.8,1.7,2,1.8,rgb(.66,.53,.35),"",(.24,.27,.30),columns=2)
box(1.4,-6.6,4.2,.34,.34,2.3,rgb(.70,.74,.70))
for z in (3.35,3.7,4.05): box(1.4,-6.6,z,.62,.62,.07,rgb(.29,.40,.43))
box(1.4,-6.6,5.45,.55,.55,.13,rgb(.73,.75,.69))

# Basketball court, painted key and a real hoop at the island's west-south edge.
box(-5.6,5.4,.43,3.7,2.4,.07,rgb(.20,.34,.51),yaw=.18)
box(-5.6,5.4,.48,1.3,1.0,.035,rgb(.80,.66,.30),yaw=.18)
box(-5.6,4.12,2.0,.09,.07,2.9,rgb(.10,.13,.13))
box(-5.6,4.12,3.44,.72,.10,.54,rgb(.88,.87,.80))
sphere(-5.6,4.04,3.12,.32,.08,.32,rgb(.92,.40,.12))

# Hand-set cobblestone routes and plaza tiles, laid in three staggered rows.
def cobble(cx,cy,ang,length,width,stone_color):
    box(cx,cy,.405,width,length,.085,stone_color,yaw=ang)
for i in range(300):
    a=2*math.pi*i/300
    r=6.35
    x=-.15+math.cos(a)*r
    y=.6+math.sin(a)*r*.72
    for lane in (-.36,0,.36):
        lx=x-math.sin(a)*lane; ly=y+math.cos(a)*lane
        cobble(lx,ly,a+math.pi/2,.40,.34,rgb(.80+((i+int(lane*10))%3)*.008,.77,.68))
for start,end,steps in [((-1.2,1.2),(-4.2,-4.1),19),((-2.1,.5),(-6.8,-.3),25),
                        ((1.3,1.4),(6.3,1.7),27),((3.0,1.8),(5.2,5.8),24)]:
    angle=math.atan2(end[1]-start[1],end[0]-start[0])
    for i in range(steps):
        t=(i+.5)/steps
        x=start[0]*(1-t)+end[0]*t
        y=start[1]*(1-t)+end[1]*t
        for lane in (-.32,0,.32):
            cobble(x-math.sin(angle)*lane,y+math.cos(angle)*lane,angle,.39,.31,rgb(.82,.79,.71))

# Trees with trunks, layered foliage, flowering cherry crowns, benches and lamps.
def tree(x,y,kind=0,scale=1):
    box(x,y,.38+.67*scale,.11*scale,.11*scale,1.34*scale,rgb(.38,.25,.14))
    sphere(x,y,.38+1.42*scale,.63*scale,.56*scale,.69*scale,
           rgb(.76,.43,.58) if kind==1 else rgb(.23,.49,.23))
    if kind == 1:
        for k in range(34):
            a=k*2.4; r=.51*scale*(.25+(k%5)*.14)
            sphere(x+math.cos(a)*r,y+math.sin(a)*r,.38+1.35*scale+(k%7)*.055*scale,
                   .23*scale,.21*scale,.23*scale,rgb(.72+(k%3)*.035,.40,.56+(k%4)*.035))
    else:
        for k in range(34):
            a=k*2.399; r=.52*scale*(.25+(k%5)*.14)
            sphere(x+math.cos(a)*r,y+math.sin(a)*r,.38+1.34*scale+(k%7)*.055*scale,
                   .24*scale,.22*scale,.23*scale,rgb(.20+.035*(k%3),.45+.025*(k%4),.20+.02*(k%2)))
for i,(x,y,k,s) in enumerate([(-9,-3,0,1.1),(-8,-5,1,1.15),(-6,-8,0,.8),(0,-8,0,.8),
                                (8,-7,0,1.0),(9,-2,1,1.2),(8,3,0,.9),(-8,4,0,.8),(-7,8,1,1.05),
                                (1,8,1,1.0),(3,5,0,.85),(0,-3,0,.72)]): tree(x,y,k,s)
for x,y in [(-1,4.5),(3.6,-.2),(-8,-.8)]:
    box(x,y,.78,1.25,.35,.10,rgb(.48,.30,.16))
    box(x,y+.14,1.08,1.25,.10,.52,rgb(.52,.34,.19))
    for lx in (x-.46,x+.46): box(lx,y,.55,.06,.08,.47,rgb(.12,.14,.14))
for x,y in [(-2.8,3.0),(3.6,3.8),(-2.6,-2.0)]:
    box(x,y,1.15,.07,.07,1.55,rgb(.12,.15,.14))
    sphere(x,y,2.02,.23,.23,.30,rgb(.86,.80,.61))

# Timber pier continuing from the south bank into open water, with sailboat.
for z in range(9):
    py=7.4+z*.50
    box(4.4,py,.45,1.25,.47,.11,rgb(.55,.37,.21))
    for x in (3.9,4.9): box(x,py,-.36,.10,.10,1.35,rgb(.39,.27,.16))
# Archway entrance over the pier and mooring boat with mast, rigging and sail.
for x in (3.55,5.25):
    box(x,7.25,1.45,.12,.14,1.9,rgb(.38,.24,.14))
for i in range(13):
    a=math.pi*i/12
    box(4.4+math.cos(a)*.85,7.25,2.25+math.sin(a)*.85,.13,.14,.15,rgb(.38,.24,.14),yaw=a)
sphere(5.55,11.65,-.45,.39,1.05,.23,rgb(.27,.34,.38))
box(5.55,11.65,-.25,.06,.06,2.6,rgb(.23,.22,.18))
box(5.55,11.65,.48,.10,.06,1.15,rgb(.92,.89,.80))
box(5.82,11.5,.45,.08,.05,.83,rgb(.96,.94,.88))

mesh = bpy.data.meshes.new("Sculpted island terrain")
bad_colors = [(i, c) for i, c in enumerate(vertex_colors) if len(c) != 4]
if bad_colors:
    raise ValueError("Invalid vertex colors: " + repr(bad_colors[:5]))
mesh.from_pydata(verts, [], faces)
mesh.materials.append(grass)
mesh.materials.append(rock)
mesh.update()
island = bpy.data.objects.new("Blender Island | meadow and sculpted coast", mesh)
bpy.context.collection.objects.link(island)
for poly, mat_index in zip(mesh.polygons, face_materials):
    poly.material_index = mat_index
    poly.use_smooth = True
color_attr = mesh.color_attributes.new(name="Color", type="FLOAT_COLOR", domain="POINT")
for item, color in zip(color_attr.data, vertex_colors):
    item.color = color

# Water and bridge are included in the editable Blender master. The website
# draws animated versions of both on top of this exported land mesh.
def surface_material(name, color, roughness, alpha=1):
    mat=bpy.data.materials.new(name)
    mat.diffuse_color=(*color,alpha)
    mat.use_nodes=True
    bsdf=mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value=(*color,alpha)
    bsdf.inputs["Roughness"].default_value=roughness
    bsdf.inputs["Alpha"].default_value=alpha
    if alpha < 1:
        mat.blend_method="BLEND"
    return mat

ocean_mat=surface_material("Mediterranean | shallow turquoise",(.30,.70,.73),.24,.82)
river_mat=surface_material("Freshwater | softly rippled cyan",(.19,.62,.69),.23,.92)
banks_mat=surface_material("Pale riverbank stone",(.75,.71,.61),.82)

def ribbon_object(name, points, width, height, mat):
    rv=[]; rf=[]; count=len(points)
    for i,(x,y) in enumerate(points):
        prev=points[max(0,i-1)]; nxt=points[min(count-1,i+1)]
        dx=nxt[0]-prev[0]; dy=nxt[1]-prev[1]
        mag=max(.001,math.hypot(dx,dy)); px=-dy/mag*width/2; py=dx/mag*width/2
        rv.extend(((x+px,y+py,height),(x-px,y-py,height)))
        if i<count-1:
            a=i*2; rf.extend(((a,a+1,a+2),(a+1,a+3,a+2)))
    rm=bpy.data.meshes.new(name+" mesh"); rm.from_pydata(rv,[],rf); rm.materials.append(mat); rm.update()
    ro=bpy.data.objects.new(name,rm); bpy.context.collection.objects.link(ro)
    for face in rm.polygons: face.use_smooth=True
    return ro

def scene_box(name,cx,cy,cz,sx,sy,sz,mat,yaw=0):
    bpy.ops.mesh.primitive_cube_add(size=1,location=(cx,cy,cz))
    ob=bpy.context.object; ob.name=name
    ob.dimensions=(sx,sy,sz)
    bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    ob.rotation_euler.z=yaw
    ob.data.materials.append(mat)
    return ob

# Soft cove floor and water surface surround the rounded island.
bpy.ops.mesh.primitive_plane_add(size=70, location=(0,0,-.94))
ocean=bpy.context.object; ocean.name="Animated ocean | website water layer"; ocean.data.materials.append(ocean_mat)
river_controls=[(1.6,-2.0),(1.6,-.4),(2.5,.9),(4.1,2.0),(4.9,3.2),(5.7,4.25),(7.4,5.65)]
river_points=[]
for i in range(len(river_controls)-1):
    a=river_controls[i]; b=river_controls[i+1]
    for step in range(12):
        t=step/12
        river_points.append((a[0]*(1-t)+b[0]*t,a[1]*(1-t)+b[1]*t))
river_points.append(river_controls[-1])
ribbon_object("Winding stream | animated in website",river_points,1.30,.405,river_mat)
ribbon_object("Rounded stream banks",river_points,1.66,.389,banks_mat)

# Segmental limestone footbridge with a shallow arch and stone parapets.
bridge_yaw=.98; bridge_x,bridge_y=3.1,1.1
for i in range(11):
    u=(i-5)*.21
    x=bridge_x+u*math.cos(bridge_yaw); y=bridge_y+u*math.sin(bridge_yaw)
    arch=.14+.31*(1-(u/1.15)**2)
    scene_box("Bridge | limestone arch deck",x,y,.405+arch,.24,1.30,.16,banks_mat,bridge_yaw)
    for side in (-.62,.62):
        sx=x-math.sin(bridge_yaw)*side; sy=y+math.cos(bridge_yaw)*side
        scene_box("Bridge | limestone parapet",sx,sy,.64+arch,.22,.18,.38,banks_mat,bridge_yaw)
for side in (-.62,.62):
    for i in range(5):
        u=(i-2)*.54
        x=bridge_x+u*math.cos(bridge_yaw)-math.sin(bridge_yaw)*side
        y=bridge_y+u*math.sin(bridge_yaw)+math.cos(bridge_yaw)*side
        scene_box("Bridge | stone baluster",x,y,.86,.15,.16,.52,banks_mat,bridge_yaw)

# A useful native Blender scene with camera, lighting, and a clean groundless
# stage, while the website supplies its own camera, ocean, river, and buildings.
bpy.ops.object.camera_add(location=(21, 25, 22))
camera = bpy.context.object
camera.name = "Island presentation camera"
direction = Vector((0, 0, -0.1)) - camera.location
camera.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
camera.data.lens = 52
bpy.context.scene.camera = camera
bpy.ops.object.light_add(type="AREA", location=(-7, -10, 18))
key = bpy.context.object
key.name = "Soft afternoon sun"
key.data.energy = 2400
key.data.shape = "DISK"
key.data.size = 12
key.rotation_euler = (Vector((0, 0, 0)) - key.location).to_track_quat("-Z", "Y").to_euler()
scene = bpy.context.scene
scene.render.engine = "CYCLES"
scene.cycles.samples = 32
scene.render.resolution_x = 1600
scene.render.resolution_y = 1200
scene.render.resolution_percentage = 100
scene.world.color = (0.72, 0.82, 0.80)
world_bg = scene.world.node_tree.nodes.get("Background")
world_bg.inputs["Color"].default_value = (0.72, 0.83, 0.80, 1)
world_bg.inputs["Strength"].default_value = 0.8
scene.render.image_settings.file_format = "PNG"
scene.render.filepath = os.path.join(ASSETS, "island-blender-preview.png")
scene.view_settings.view_transform = "Standard"
scene.view_settings.look = "Medium High Contrast"

# Save editable source file and export the authored terrain for the site.
bpy.ops.wm.save_as_mainfile(filepath=BLEND_PATH)
bpy.ops.object.select_all(action="DESELECT")
island.select_set(True)
bpy.context.view_layer.objects.active = island
bpy.ops.export_scene.gltf(filepath=GLB_PATH, export_format="GLB",
                          use_selection=True, export_apply=True, export_yup=True,
                          export_vertex_color="NAME", export_vertex_color_name="Color",
                          export_normals=True, export_materials="EXPORT",
                          export_image_format="NONE")
print("Saved Blender project:", BLEND_PATH)
print("Exported website GLB:", GLB_PATH)

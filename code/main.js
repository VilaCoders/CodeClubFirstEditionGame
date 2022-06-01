import kaboom from "kaboom"
kaboom()

const fondoImg = await loadSprite("fondo", "sprites/fondo2.webp")
loadSprite("bean", "sprites/bean.png")
loadSprite("tree", "sprites/tree.png")
  
let score = 0;
const arbolSaltado = (tree, bean) => tree.pos.x < bean.pos.x
const arbolPuntuado = (tree) => tree.color.r === 0 
      && tree.color.g === 0
      && tree.color.b === 255

scene("game", () => {
  const fondo = add([
    sprite("fondo"),
    // Make the background centered on the screen
    pos(width() / 2, height() / 2),
    origin("center"),
    // Allow the background to be scaled
    scale(1),
    // Keep the background position fixed even when the camera moves
    fixed()
  ])

  add([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(4),
    area(),
    solid(),
    color(127, 200, 255),
  ])

  const scoreLabel = add([
    text(score),
    pos(24, 24)
  ])

  const bean = add([
    sprite("bean"),
    pos(80, 40),
    area(),  
    body()
  ])

    
  fondo.scaleTo(Math.max(
    width()/fondoImg.tex.width,
    height()/fondoImg.tex.height
  ));
  
  onUpdate("tree", (tree) =>  {
    if (arbolSaltado(tree, bean) && !arbolPuntuado(tree)) {
      score++;
      scoreLabel.text = score; 
      tree.color = BLUE
    }
  })

  onKeyPress("space", () => {
    if (bean.isGrounded()) {
        bean.jump();
    }
  });

  bean.onCollide("tree", () => {
    addKaboom(bean.pos);
    shake();
    go("lose");
  });

  function spawnTree() {
    add([
        sprite("tree", {width: 48, height: rand(2,64)}),
        area(),
        outline(4),
        pos(width(), height()-48),
        origin("botleft"),
        color(GREEN),
        move(LEFT, 480),
        outview({ hide: true, pause: true }),
        "tree",
    ]);
    wait(rand(1, 1.5), () => {
        spawnTree();
    });
  }
  spawnTree();
})

scene("lose", () => {
  add([
      text("Game Over"),
      pos(center()),
      origin("center"),
  ])
  
  const scoreLabel = add([
    text(score),
    pos(24, 24)
  ])
})

go("game")








































































































































































































































































      

















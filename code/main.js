import kaboom from "kaboom"
kaboom()


loadSprite("bean", "sprites/bean.png")

  
  
let score = 0;
const arbolSaltado = (tree, bean) => tree.pos.x < bean.pos.x
const arbolPuntuado = (tree) => tree.color.r === 0 
      && tree.color.g === 0
      && tree.color.b === 255
scene("game", () => {
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

  onUpdate("tree", (tree) =>  {
    if (arbolSaltado(tree, bean) && !arbolPuntuado(tree)) {
      score++;
      scoreLabel.text = score; 
      tree.color = BLUE
    }
})


  add([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(4),
    area(),
    solid(),
    color(127, 200, 255),
  ])


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
        rect(48, rand(24, 64)),
        area(),
        outline(4),
        pos(width(), height() - 48),
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








































































































































































































































































      

















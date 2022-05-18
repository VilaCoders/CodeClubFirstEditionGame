import kaboom from "kaboom"
kaboom()

// load a sprite "bean" from an image
loadSprite("bean", "sprites/bean.png")

  
  
 let score = 0; 
  
scene("game", () => {
  const scoreLabel = add([
    text(score),
    pos(24, 24)
  ])

  onUpdate(() => {
      score++;
      scoreLabel.text = score;
  });
  // add something to screen
  const bean = add([
    sprite("bean"),
    pos(80, 40),
    area(),  
    body()
  ])

// add platform
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
        color(255, 180, 255),
        move(LEFT, 480),
        "tree", // add a tag here
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








































































































































































































































































      

















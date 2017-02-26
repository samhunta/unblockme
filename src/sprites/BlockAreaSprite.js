import Phaser from 'phaser'

class BlockAreaSprite extends Phaser.Sprite {

  constructor ({game, x, y, asset}) {
    super(game, x, y, asset)
    this.scale.set(5)
    this.anchor.setTo(0.5)
    this.tint = 0xC9150C // red
  }

  update () {}
}

export default BlockAreaSprite

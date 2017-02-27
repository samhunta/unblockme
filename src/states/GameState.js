/* globals __DEV__ */
import Phaser from 'phaser'
import BlockSprite from '../sprites/BlockSprite'
import BlockArea from '../sprites/BlockAreaSprite'

class GameState extends Phaser.State {
  init () {}
  preload () {}

  create () {
    const bannerText = 'Phaser + ES6 + Webpack'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
    banner.font = 'Bangers'
    banner.padding.set(10, 16)
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.smoothed = false
    banner.anchor.setTo(0.5)

    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.blockArea = new BlockArea({
      game: this,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'blockArea', // place holder sprite
    })

    this.horizontalBlock = new BlockSprite({
      game: this,
      x: this.world.centerX * 0.65,
      y: this.world.centerY,
      asset: 'tallBlock',
    })
    .allowDrag({
      horizontal: true,
    })

    this.verticalBlock = new BlockSprite({
      game: this,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'tallBlock',
    })
    .allowDrag({
      vertical: true,
    })

    this.anyBlock = new BlockSprite({
      game: this,
      x: this.world.centerX * 1.35,
      y: this.world.centerY,
      asset: 'midBlock',
    })
    .allowDrag(true)

    this.game.add.existing(this.blockArea)

    /*
    const levelBlocks = [
      this.verticalBlock,
      this.horizontalBlock,
      this.anyBlock,
    ]
    */

    // Using phaser group instead of array for additional fields!
    this.levelBlocks = this.game.add.physicsGroup(Phaser.Physics.ARCADE)
    this.levelBlocks.add(this.horizontalBlock)
    this.levelBlocks.add(this.verticalBlock)
    this.levelBlocks.add(this.anyBlock)

    this.levelBlocks.children.forEach((sprite) => {
      // sprite.setBoundary(this.blockArea)
      /*
          Ean: For some reason the verticle block does not stay within the bounds.
          I don't know if this is something I'm doing wrong or a phaser es6 bug?
      */
      sprite.input.boundsSprite = this.blockArea
      this.game.add.existing(sprite)
    })
  }

  update () {
    // Enable the blocks to collide with each other
    this.game.physics.arcade.collide(this.levelBlocks)
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.verticalBlock, 32, 32)
    }
  }
}

export default GameState

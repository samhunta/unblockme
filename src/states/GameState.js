/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/MushroomSprite'
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

    /*
      Ean: this sprite is a place holder for the game area,
      it's used to keep blocks in an area via the Mushroom
      setBoundary method. This is the 'game area' sprite thus
      it should have a 6x6 graphic (referenced from the unblockme
      android game)
    */
    this.blockArea = new BlockArea({
      game: this,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom', // place holder sprite
    })

    this.horizontalMushroom = new Mushroom({
      game: this,
      x: this.world.centerX * 0.85,
      y: this.world.centerY,
      asset: 'mushroom',
    })
    .allowDrag({
      horizontal: true,
    })

    this.verticalMushroom = new Mushroom({
      game: this,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom',
    })
    .allowDrag({
      vertical: true,
    })

    this.anyMushroom = new Mushroom({
      game: this,
      x: this.world.centerX * 1.15,
      y: this.world.centerY,
      asset: 'mushroom',
    })
    .allowDrag(true)

    this.game.add.existing(this.blockArea)

    /*
     Refering to the below structure as'Blocks'
     in prep for hauling the mushrooms out
    */
    const levelBlocks = [
      this.verticalMushroom,
      this.horizontalMushroom,
      this.anyMushroom,
    ]

    levelBlocks.forEach((sprite) => {
      sprite.setBoundary(this.blockArea)
      this.game.add.existing(sprite)
    })
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.verticalMushroom, 32, 32)
    }
  }
}

export default GameState

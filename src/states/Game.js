/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
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

    this.horizontalMushroom = new Mushroom({
      game: this,
      x: this.world.centerX * 0.5,
      y: this.world.centerY,
      asset: 'mushroom'
    })
    .allowDrag({
      horizontal: true
    })

    this.verticalMushroom = new Mushroom({
      game: this,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom'
    })
    .allowDrag({
      vertical: true
    })

    this.anyMushroom = new Mushroom({
      game: this,
      x: this.world.centerX * 1.5,
      y: this.world.centerY,
      asset: 'mushroom'
    })
    .allowDrag(true)

    const mushrooms = [
      this.verticalMushroom,
      this.horizontalMushroom,
      this.anyMushroom
    ]

    mushrooms.forEach((mushroom) => {
      this.game.add.existing(mushroom)
    })
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.verticalMushroom, 32, 32)
    }
  }
}

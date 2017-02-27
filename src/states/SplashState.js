import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

class SplashState extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('mushroom', 'assets/images/mushroom2.png')
    this.load.image('blockArea', 'assets/images/areaBoard.png')
    this.load.image('midBlock', 'assets/images/midBlock.png')
    this.load.image('tallBlock', 'assets/images/tallBlock.png')
  }

  create () {
    this.state.start('Game')
  }

}

export default SplashState

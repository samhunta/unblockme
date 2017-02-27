import Phaser from 'phaser'

class BlockSprite extends Phaser.Sprite {

  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.inputEnabled = true
    this.setupDragEvents()
  }

  update () {}

  setBoundary (sprite) {
    this.input.boundsSprite = sprite
  }

  setupDragEvents () {
    this.events.onDragStart.add((...args) => {
      this.isDragging = true
    })

    this.events.onDragStop.add((...args) => {
      this.isDragging = false
    })
  }

  allowDrag (allowedDirections) {
    if (typeof allowedDirections === 'object') {
      this.input.allowVerticalDrag = !!allowedDirections.vertical
      this.input.allowHorizontalDrag = !!allowedDirections.horizontal

      if (allowedDirections.vertical || allowedDirections.horizontal) {
        this.input.enableDrag()
      } else {
        this.input.disableDrag()
      }
    } else {
      this.input.allowVerticalDrag = !!allowedDirections
      this.input.allowHorizontalDrag = !!allowedDirections

      if (allowedDirections) {
        this.input.enableDrag()
      } else {
        this.input.disableDrag()
      }
    }

    return this
  }

}

export default BlockSprite

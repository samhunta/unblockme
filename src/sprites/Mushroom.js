import Phaser from 'phaser'

export default class extends Phaser.Sprite {

  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.scale.set(0.6)
    this.inputEnabled = true
    this.setupDragEvents()
  }

  update () {
    if (!this.isDragging) {
      this.angle += 1
    }
  }

  setBoundry (sprite) {
    this.input.boundsSprite = sprite
  }

  setupDragEvents () {
    this.events.onDragStart.add((...args) => {
      this.isDragging = true
      this.angle = 0
      this.scale.set(1)
    })

    this.events.onDragStop.add((...args) => {
      this.isDragging = false
      this.scale.set(0.6)
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

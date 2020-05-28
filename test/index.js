import React from 'react'

export default class App {

  // 渲染title
  renderTitie = () => {}

  noComment = () => {}

  /**
   * 渲染body
   *
   * @memberof App
   */
  renderBody = () => {}

  render() {
    return <h1>
      {this.renderTitie()}
      {this.renderBody()}
    </h1>
  }
}
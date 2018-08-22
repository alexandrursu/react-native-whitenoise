import React from "react";
import Canvas from "react-native-canvas";

export default class CanvasImage extends React.Component {
  handleCanvas = async canvas => {
    const ctx = canvas.getContext("2d");
    let xoff = -160;
    let yoff = -120;
    let gradient = await ctx.createLinearGradient(0, 0, 120, 0);
    canvas.width = 150;
    canvas.height = 150;
    ctx.fillStyle = gradient;
    ctx.width = 50;
    ctx.height = 50;
    ctx.beginPath();
    ctx.moveTo(202 + xoff, 143 + yoff);
    ctx.strokeStyle = "rgba(255,255,255, 0.5)";
    gradient.addColorStop(0, "#f5ff5b");
    gradient.addColorStop(0.25, "#fdf659");
    gradient.addColorStop(0.75, "#82fc98");
    gradient.addColorStop(1, "#00ffd1");
    ctx.bezierCurveTo(
      189 + xoff,
      190 + yoff,
      173 + xoff,
      185 + yoff,
      173 + xoff,
      199 + yoff
    );
    ctx.bezierCurveTo(
      173 + xoff,
      216 + yoff,
      190 + xoff,
      211 + yoff,
      200 + xoff,
      237 + yoff
    );
    ctx.bezierCurveTo(
      220 + xoff,
      288 + yoff,
      243 + xoff,
      261 + yoff,
      268 + xoff,
      234 + yoff
    );
    ctx.bezierCurveTo(
      280 + xoff,
      221 + yoff,
      311 + xoff,
      226 + yoff,
      300 + xoff,
      205 + yoff
    );
    ctx.bezierCurveTo(
      282 + xoff,
      170 + yoff,
      300 + xoff,
      147 + yoff,
      271 + xoff,
      147 + yoff
    );
    ctx.bezierCurveTo(
      229 + xoff,
      147 + yoff,
      230 + xoff,
      118 + yoff,
      203 + xoff,
      142 + yoff
    );
    ctx.stroke();
    ctx.fill();
  };
  render() {
    return <Canvas ref={this.handleCanvas} />;
  }
}

/** @license 
  * Copyright 2023 Google LLC.
  * SPDX-License-Identifier: Apache-2.0 
  */

class ColorCube {
    static Tags = ['3d'];

    frame(glsl, params) {
        glsl({...params, Grid:[10,10,10], Clear:[0.2, 0.2, 0.3, 1],
              Aspect:'fit', DepthTest:1, AlphaCoverage:1, Inc:`
        varying vec3 color;`, VP:`
        vec3 p = color = vec3(ID)/vec3(Grid-1);
        vec4 pos = vec4(p-0.5, 1);
        pos = wld2view(pos);
        pos.xy += XY*0.03;  // offset quad corners in view space
        VOut = view2proj(pos);`, FP:`
        float r = length(XY);
        float alpha = smoothstep(1.0, 1.0-fwidth(r), r);
        FOut = vec4(color, alpha);`});
    }
}

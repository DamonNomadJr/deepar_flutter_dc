# DeepAR Web SDK

Add 3D face masks, effects and more with better performance than Snapchat in a powerful SDK built for HTML5.

## Documentation

Visit official DeepAR docs for Web SDK here https://docs.deepar.ai/category/deepar-sdk-for-web.

## Contents of the Web SDK

- `js` directory - contains the Javascript SDK files
  - `deepar.js` Use this when including the SDK with HTML `<script>` tag. `DeepAR` class will be available in the global JS namespace.
  - `deepar.d.ts` Typescript declarations for the `deepar.js` file.
  - `deepar.esm.js` Use this when you are using SDK with bundlers like Webpack or Rollup, or when you want to include SDK like an ES module in `<script>` tag. Example import `import { DeepAR } from 'deepar.esm'`.
  - `deepar.esm.d.ts` Typescript declarations for the `deepar.esm.js` file.
- `models` directory - contains models used by DeepAR SDK. Models that are used need to be stored on the server and served so the DeepAR can load them. Paths to these models are usually passed in the constructor of the `DeepAR` class.
  - `face` directory - contains face tracking models. These are loaded by `DeepAR.downloadFaceTrackingModel(path)` method.
  - `segmentation` directory - contains background segmentation/removal models. Model is passed in the constructor of the `DeepAR` class in the parameter `segmentationConfig.modelPath`.
  - `foot` directory - contains models and assets used by foot tracking (shoe try-on). These are passed in the constructor of the `DeepAR` class in the parameter `footTrackingConfig`.
- `wasm` directory - contains Web Assembly SDK files which are loaded by the SDK. Used wasm files need to be stored on the server and served so the DeepAR can load them. Paths to wasm files are passed in the constructor of the `DeepAR` class.
  - `deepar.wasm` Main wasm file of the SDK. Always needs to be loaded. Path is passed in constructor of `DeepAR` class in the parameter `deeparWasmPath`.
  - `libxzimgPoseEstimation.wasm` Wasm file used by foot tracking. Passed in constructor of the `DeepAR` class in the parameter `footTrackingConfig.poseEstimationWasmPath`.
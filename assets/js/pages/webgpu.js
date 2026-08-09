export default class WebGPUPage {
  constructor() {
    this.controller = new AbortController();
    this.handleRun = this.handleRun.bind(this);
  }

  async init() {
    this.status = document.getElementById('webgpu-status');
    this.button = document.getElementById('webgpu-button');
    this.output = document.getElementById('webgpu-output');
    this.fallback = document.getElementById('webgpu-fallback');

    if (this.button) {
      this.button.addEventListener('click', this.handleRun);
    }

    if (!navigator.gpu) {
      this.status.textContent = 'WebGPU not supported in this browser.';
      this.fallback.hidden = false;
      this.button.disabled = true;
      return;
    }

    this.status.textContent = 'WebGPU is supported. Click Run GPU Demo.';
  }

  async handleRun() {
    try {
      this.status.textContent = 'Requesting WebGPU adapter...';
      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) {
        throw new Error('No GPU adapter found.');
      }
      this.status.textContent = 'Creating device...';
      const device = await adapter.requestDevice();
      const shader = `@compute @workgroup_size(64)
        @group(0) @binding(0) var<storage, read_write> output : array<u32>;
        fn main(@builtin(global_invocation_id) global_id : vec3<u32>) {
          let index = global_id.x;
          output[index] = index * 2u;
        }`;

      const module = device.createShaderModule({ code: shader });
      const pipeline = device.createComputePipeline({ layout: 'auto', compute: { module, entryPoint: 'main' } });
      const bufferSize = 64 * 4;
      const outputBuffer = device.createBuffer({
        size: bufferSize,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
      });
      const readBuffer = device.createBuffer({
        size: bufferSize,
        usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
      });

      const commandEncoder = device.createCommandEncoder();
      const pass = commandEncoder.beginComputePass();
      pass.setPipeline(pipeline);
      pass.setBindGroup(0, device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [{ binding: 0, resource: { buffer: outputBuffer } }],
      }));
      pass.dispatchWorkgroups(1);
      pass.end();
      commandEncoder.copyBufferToBuffer(outputBuffer, 0, readBuffer, 0, bufferSize);
      device.queue.submit([commandEncoder.finish()]);

      await readBuffer.mapAsync(GPUMapMode.READ, 0, bufferSize);
      const arrayBuffer = readBuffer.getMappedRange(0, bufferSize);
      const result = new Uint32Array(arrayBuffer.slice());
      readBuffer.unmap();

      this.output.textContent = `GPU result: ${Array.from(result).slice(0, 16).join(', ')} ...`;
      this.status.textContent = 'WebGPU demo completed successfully.';
    } catch (error) {
      console.error(error);
      this.status.textContent = `WebGPU error: ${error.message}`;
      this.fallback.hidden = false;
    }
  }

  destroy() {
    this.controller.abort();
    if (this.button) {
      this.button.removeEventListener('click', this.handleRun);
    }
  }
}

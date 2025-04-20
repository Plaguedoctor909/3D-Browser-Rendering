 // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Geometry and Shader Material
  const geometry = new THREE.BoxGeometry();

  const vertexShader = `
    varying vec3 vPosition;
    void main() {
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec3 vPosition;
    void main() {
      gl_FragColor = vec4(abs(vPosition.xyz), 1.0);
    }
  `;

  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader
  });

  // Cube with shader
  const cube = new THREE.Mesh(geometry, shaderMaterial);
  scene.add(cube);

  camera.position.z = 3;

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();

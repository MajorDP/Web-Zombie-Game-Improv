import React, { useRef, useEffect } from "react";
import { Engine, Scene } from "@babylonjs/core";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";

const GameEngine = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const bullets = useRef([]);
  const zombies = useRef([]);

  useEffect(() => {
    if (canvasRef.current) {
      engineRef.current = new Engine(canvasRef.current, true);
      sceneRef.current = new Scene(engineRef.current);

      //Camera setup
      const camera = new BABYLON.ArcRotateCamera(
        "camera1",
        Math.PI,
        Math.PI / 4,
        10,
        BABYLON.Vector3.Zero(),
        sceneRef.current
      );
      camera.setPosition(new BABYLON.Vector3(0, 0, -20));
      camera.beta = Math.PI / 3.5;
      camera.lockedTarget = new BABYLON.Vector3(0, 6, -40);
      camera.attachControl(canvasRef.current, false);

      //Light setup
      const hemisphericLight = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        sceneRef.current
      );
      hemisphericLight.intensity = 0.7;

      //Ground setup
      const ground = BABYLON.MeshBuilder.CreateGround(
        "ground",
        { width: 20, height: 100 },
        sceneRef.current
      );
      ground.position.y = 0;

      //Initial soldier model
      const soldierMaterial = new BABYLON.StandardMaterial(
        "soldierMaterial",
        sceneRef.current
      );
      soldierMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
      let soldier = BABYLON.MeshBuilder.CreateBox(
        "soldier",
        { size: 1 },
        sceneRef.current
      );
      soldier.position = new BABYLON.Vector3(0, 20, -40);

      //Loading actual soldier model
      const loadSoldierModel = async () => {
        try {
          const result = await BABYLON.SceneLoader.ImportMeshAsync(
            "",
            "/soldier.glb",
            "",
            sceneRef.current
          );

          if (result.meshes.length > 0) {
            soldier.dispose();

            soldier = result.meshes[0];
            soldier.position = new BABYLON.Vector3(0, 0.5, -40);
            soldier.scaling = new BABYLON.Vector3(2, 2, 2);
            result.meshes.forEach((mesh) => (mesh.rotation.y = Math.PI));
          }
        } catch (error) {
          console.error("Failed to load model:", error);
        }
      };

      loadSoldierModel();

      // Creating zombies
      const zombieMaterial = new BABYLON.StandardMaterial(
        "zombieMaterial",
        sceneRef.current
      );
      zombieMaterial.diffuseColor = new BABYLON.Color3(0, 1, 0);

      for (let i = 0; i < 5; i++) {
        const zombie = BABYLON.MeshBuilder.CreateSphere(
          "zombie_" + i,
          { diameter: 1 },
          sceneRef.current
        );
        zombie.position = new BABYLON.Vector3(
          Math.random() * 10 - 5,
          0.5,
          50 + i * 5
        );
        zombie.material = zombieMaterial;
        zombie.scaling = new BABYLON.Vector3(3, 3, 3);
        zombies.current.push(zombie);
      }

      //Player actions
      let moveLeft = false;
      let moveRight = false;
      const speed = 0.5;

      window.addEventListener("keydown", (e) => {
        if (e.code === "ArrowLeft" || e.code === "KeyA") {
          moveLeft = true;
        } else if (e.code === "ArrowRight" || e.code === "KeyD") {
          moveRight = true;
        }
      });

      window.addEventListener("keyup", (e) => {
        if (e.code === "ArrowLeft" || e.code === "KeyA") moveLeft = false;
        if (e.code === "ArrowRight" || e.code === "KeyD") moveRight = false;
        if (e.code === "Space") {
          fireBullet();
        }
      });

      //Bullet firing
      const fireBullet = () => {
        if (!soldier) return;

        const bullet = BABYLON.MeshBuilder.CreateSphere(
          "bullet",
          { diameter: 0.2 },
          sceneRef.current
        );
        bullet.position = soldier.position.clone();
        bullet.position.y += 1;

        bullet.material = new BABYLON.StandardMaterial(
          "bulletMaterial",
          sceneRef.current
        );
        bullet.material.diffuseColor = new BABYLON.Color3(1, 1, 0);

        bullets.current.push(bullet);
      };

      sceneRef.current.registerBeforeRender(() => {
        if (moveLeft && soldier.position.x > -8) soldier.position.x -= speed;
        if (moveRight && soldier.position.x < 8) soldier.position.x += speed;

        //Bullets movement
        bullets.current.forEach((bullet, index) => {
          bullet.position.z += 1;
          if (bullet.position.z > 100) {
            bullet.dispose();
            bullets.current.splice(index, 1);
          }
        });

        //Zombies movement
        zombies.current.forEach((zombie, zombieIndex) => {
          zombie.position.z -= 0.2;
          bullets.current.forEach((bullet, bulletIndex) => {
            if (
              BABYLON.Vector3.Distance(bullet.position, zombie.position) < 2
            ) {
              bullet.dispose();
              zombie.dispose();
              bullets.current.splice(bulletIndex, 1);
              zombies.current.splice(zombieIndex, 1);
            }
          });

          if (BABYLON.Vector3.Distance(soldier.position, zombie.position) < 1) {
            alert("Game Over: A zombie reached the soldier!");
            engineRef.current.stopRenderLoop();
          }
        });
      });

      engineRef.current.runRenderLoop(() => {
        sceneRef.current.render();
      });

      window.addEventListener("resize", () => engineRef.current.resize());

      return () => {
        if (sceneRef.current) {
          engineRef.current.dispose();
          sceneRef.current.dispose();
        }
      };
    }
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100vh" }} />;
};

export default GameEngine;

/**
 * The Robotics Hackathon kit (26 November 2026), from BeOutlier's bill of
 * materials (Navator robocar and control glove). Every student gets one kit
 * and keeps it. Prices and suppliers stay internal and are never shown.
 * Set `photo` on an item to show a real photo instead of its illustration.
 */
import type { KitArtName } from "@/components/sections/KitArt";

export interface KitItem {
  art: KitArtName;
  name: string;
  qty: number;
  what: string;
  spec: string;
  photo?: string;
}

export interface KitGroup {
  id: string;
  title: string;
  line: string;
  items: KitItem[];
}

export const kitGroups: KitGroup[] = [
  {
    id: "glove",
    title: "The glove",
    line: "Your controller. It reads how your hand moves and what you say.",
    items: [
      { art: "imu", name: "Motion sensor", qty: 1, what: "Feels every tilt and turn of your hand.", spec: "BMI270 6 axis IMU" },
      { art: "mic", name: "Microphone", qty: 1, what: "Hears your voice commands.", spec: "SPH0645 I²S digital mic" },
      { art: "qwiic", name: "Sensor cable", qty: 1, what: "Connects the motion sensor to your board.", spec: "Qwiic to jumper leads" },
      { art: "glove", name: "Fabric glove", qty: 1, what: "Where the controller lives, with a strap and tape to mount it.", spec: "Hook and loop strap" },
    ],
  },
  {
    id: "car",
    title: "The robocar",
    line: "A two wheel car that drives on your command.",
    items: [
      { art: "driver", name: "Motor driver", qty: 1, what: "Lets the board run both motors, forward and back.", spec: "TB6612FNG dual driver" },
      { art: "motor", name: "Geared DC motors", qty: 2, what: "One for each wheel.", spec: "100 RPM BO motors" },
      { art: "wheels", name: "Wheel set", qty: 1, what: "Two 65 mm wheels and a caster.", spec: "BO wheels and caster" },
      { art: "cells", name: "Rechargeable AA cells", qty: 4, what: "Power for the motors. Charge them, use them again.", spec: "1.2 V NiMH" },
      { art: "holder", name: "Battery holder", qty: 1, what: "Holds all four cells, with an on and off switch.", spec: "Switched 4 × AA" },
      { art: "hardware", name: "Leads and mounting set", qty: 1, what: "Motor leads, pin headers and the screws that hold it together.", spec: "Hardware set" },
    ],
  },
  {
    id: "core",
    title: "For both builds",
    line: "The brains, the power and the wiring.",
    items: [
      { art: "esp32", name: "ESP32 boards", qty: 2, what: "The brains. One in the glove, one in the car, talking over WiFi.", spec: "ESP32 DevKit, Arduino compatible" },
      { art: "powerbank", name: "Power banks", qty: 2, what: "One for each board.", spec: "5 V USB" },
      { art: "usb", name: "USB cables", qty: 2, what: "To power and program each board.", spec: "Micro USB, power and data" },
      { art: "breadboard", name: "Mini breadboards", qty: 2, what: "Build and change circuits without soldering.", spec: "170 tie points" },
      { art: "jumpers", name: "Jumper wire set", qty: 1, what: "Wires to connect everything on the breadboard.", spec: "M to M, M to F, F to F" },
      { art: "leds", name: "LEDs and resistors", qty: 1, what: "Status lights, so you can see what your build is doing.", spec: "2 LEDs, 2 × 330 Ω" },
    ],
  },
];

/** 16 components across the three groups */
export const kitComponentCount = kitGroups.reduce((n, g) => n + g.items.length, 0);

import * as QRCode from "qrcode";
import { createCanvas, loadImage, CanvasRenderingContext2D } from "canvas";
import fs from 'fs';

export async function createQR(businessName:string,dataForQRcode: string, center_image: string, width: number, cwidth: number): Promise<void> {
  const canvas = createCanvas(width, width);
  center_image="data:image/png;base64,"+center_image
  QRCode.toCanvas(
    canvas,
    dataForQRcode,
    {
      errorCorrectionLevel: "H",
      margin: 1,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    }
  );
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
  const img = await loadImage(center_image);
  const center = (width - cwidth * 1.40) / 2;
  ctx.drawImage(img, center, center, cwidth, cwidth);
  const buffer =canvas.toBuffer("image/png");
  await fs.writeFileSync(`./public/images/QRcodes/${businessName}.png`, buffer);
}


export function base64_encode(file:any) {
    var bitmap = fs.readFileSync(file);
    return Buffer.from(bitmap).toString('base64');
}


export async function base64_decode(imageData:string) {
    const data = imageData.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(data, "base64");
    await fs.writeFileSync("image.png", buffer);
}
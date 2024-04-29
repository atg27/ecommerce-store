'use server'

import db from '@/db/db'
import { z } from 'zod'
import fs from "fs/promises"
import { notFound, redirect } from 'next/navigation'

const fileScehma = z.instanceof(File, { message: 'required' })
const imageSchema = fileScehma.refine(file => file.size === 0 || file.type.startsWith("image/"), "required")

const addSchema = z.object({
  name: z.string(),
  description: z.string(),
  priceInCents: z.coerce.number().int().min(1),
  file: fileScehma.refine(file => file.size > 0, "required"),
  image: imageSchema.refine(file => file.size > 0, "required"),
})

export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }
  
  const data = result.data

await fs.mkdir("products", {recursive: true})
  const filePath = `products/${crypto.randomUUID()}-${data.file.name}`
  await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))

  await fs.mkdir("public/products", {recursive: true})
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
  await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

  await db.product.create({ 
    data: {
      isAvailableForPurchase: false,
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      filePath,
      imagePath,
  }})

  redirect("/admin/products")
}


export async function toggleProductAvailablity(id: string, isAvailableForPurchase: boolean) {
  await db.product.update({
    where: { id },
    data: { isAvailableForPurchase }
  })
}

export async function deleteProduct(id: string) {
  const product = await db.product.delete({
    where: { id }
  })
  if (product === null) return notFound()
}
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
} from '@react-email/components'
import { OrderInformation } from './components/OrderInformation'
import React from 'react'

type OrderHistoryEmailProps = {
  orders: {
    id: string
    createdAt: Date
    pricePaidInCents: number
    downloadVerificationId: string
    product: {
      name: string
      imagePath: string
      description: string
    }
  }[]
}

OrderHistoryEmail.PreviewProps = {
  orders: [
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      pricePaidInCents: 10000,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: 'Product Name',
        description: 'Product description',
        imagePath:
          '/products/ae3325b5-b66b-4722-98db-9907d8313c24-testimage.webp',
      },
    },
    // {
    //   id: crypto.randomUUID(),
    //   createdAt: new Date(),
    //   pricePaidInCents: 2000,
    //   product: {
    //     name: '2',
    //     description: 'Product description 2',
    //     imagePath:
    //       '/products/37636751-c4fb-4e5b-865a-e6f28cfba137-IMG_5216 Medium.jpeg',
    //   },
    //   downloadVerificationId: crypto.randomUUID(),
    // },
  ],
} satisfies OrderHistoryEmailProps

export default function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
  return (
    <Html>
      <Preview>Order History & Downloads</Preview>
      <Tailwind>
        {/* can pass custom config in TW component ^ */}
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Order History</Heading>
            {orders.map((order, index) => (
              <React.Fragment key={order.id}>
                <OrderInformation
                  order={order}
                  product={order.product}
                  downloadVerificationId={order.downloadVerificationId}
                />
                {index < orders.length - 1 && <Hr />}
              </React.Fragment>
            ))}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

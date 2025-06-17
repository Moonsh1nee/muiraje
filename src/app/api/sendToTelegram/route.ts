import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import { CartItem } from '@/assets/store/useCartStore';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return NextResponse.json(
      { success: false, error: 'Telegram configuration missing' },
      { status: 500 },
    );
  }

  try {
    const {
      name,
      email,
      phone,
      address,
      delivery,
      comment,
      finalTotal: totalPrice,
      cart,
    } = await request.json();

    const fileContent = await fs.readFile('src/assets/data/orders.json', 'utf-8');
    const orderData = JSON.parse(fileContent);
    const orderNumber = orderData.lastOrderNumber + 1;
    orderData.lastOrderNumber = orderNumber;
    await fs.writeFile('src/assets/data/orders.json', JSON.stringify(orderData, null, 2));


    const deliveryMethod = delivery === 'pickup' ? 'Самовывоз СДЭК' : 'Мьюражер';
    const deliveryCost = delivery === 'pickup' ? 224 : 424;
    const isFreeDelivery = totalPrice >= 12424;
    const finalDeliveryCost = isFreeDelivery ? 0 : deliveryCost;

    const itemsList = cart
      .map((item: CartItem, index: number) => {
        const details = [
          item.color ? `Цвет: ${item.color}` : null,
          item.size ? `Размер: ${item.size}` : null,
          item.length ? `Длина: ${item.length} см` : null,

        ].filter(Boolean).join(', ');
        return `${index + 1}. ${item.name} (${item.quantity} шт.) — ${item.price.toLocaleString('ru-RU')} руб./шт.\n   ${details}${item.warning ? '\n   ⚠️ Внимание: товар с предупреждением' : ''}`;
      })
      .join('\n');

    const message = `
*Заказ №${orderNumber}*
👤 *Получатель*: ${name}
📧 *Email*: ${email}
📞 *Телефон*: ${phone}
📍 *Адрес*: ${address || 'Не указан'}
🚚 *Способ доставки*: ${deliveryMethod} (${isFreeDelivery ? 'Бесплатно' : `${finalDeliveryCost} руб.`})
💬 *Комментарий*: ${comment || 'Нет'}
📦 *Товары*: 
${itemsList}
💰 *Итоговая сумма*: ${totalPrice.toLocaleString('ru-RU')} руб.
    `.trim();

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      },
    );

    const data = await response.json();
    if (data.ok) {
      return NextResponse.json({ success: true, orderNumber });
    } else {
      return NextResponse.json(
        { success: false, error: data.description },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 },
    );
  }
}
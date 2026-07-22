import { NextRequest, NextResponse } from 'next/server';
import { MENU } from '@/lib/data';
import type { BackendChatResponse, CartItem } from '@/lib/types';

export const runtime = 'nodejs';

/**
 * Demo chat endpoint.
 *
 * TODO: Replace this entire handler with a call to your real backend / LLM.
 * The frontend already renders any structured response that matches
 * `BackendChatResponse` — see lib/types.ts. Keep this shape and the UI
 * works end-to-end the moment you wire up real intelligence.
 *
 * Expected response shape:
 * {
 *   reply: string,            // the assistant message text
 *   tool?: string,            // e.g. "add_to_cart" | "remove_from_cart" | "clear_cart"
 *   cart?: CartItem[],        // FULL cart snapshot — frontend replaces its cart with this
 *   cartSummary?: { itemCount, subtotal },
 *   suggestedPrompts?: string[]
 * }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message: string = (body?.message ?? '').toLowerCase().trim();
    const conversation = Array.isArray(body?.conversation) ? body.conversation : [];

    // Simulate latency so the typing indicator feels real.
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 500));

    const response = buildDemoReply(message, conversation);
    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      {
        reply:
          "I'm having trouble right now. Please try again in a moment.",
      } satisfies BackendChatResponse,
      { status: 200 }
    );
  }
}

/**
 * Lightweight demo "intelligence" — keyword based, purely for the portfolio
 * experience. Replace `buildDemoReply` with your real backend call.
 */
function buildDemoReply(message: string, _conversation: unknown): BackendChatResponse {
  const has = (...keys: string[]) => keys.some((k) => message.includes(k));

  // Spicy
  if (has('spicy', 'hot', 'fire')) {
    const item = MENU.find((m) => m.id === 'wr-firecracker')!;
    return withCartReply(
      `Try the ${item.name} — ${item.description.toLowerCase()} It packs serious heat at ${formatPrice(item.price)}. Want me to add it?`,
      'add_to_cart',
      [toCartItem(item)]
    );
  }

  // Vegetarian / vegan
  if (has('vegetarian', 'vegan', 'veggie', 'no meat', 'meatless')) {
    const item = MENU.find((m) => m.id === 'pz-supreme')!;
    return withCartReply(
      `You'd love our ${item.name} — ${item.description.toLowerCase()} It's ${item.calories} cal and ${formatPrice(item.price)}.`,
      'add_to_cart',
      [toCartItem(item)]
    );
  }

  // Burgers
  if (has('burger')) {
    const item = MENU.find((m) => m.id === 'brg-classic')!;
    return withCartReply(
      `Our ${item.name} is a crowd favorite — ${item.description.toLowerCase()} ${formatPrice(item.price)} and rated ${item.rating}/5.`,
      'add_to_cart',
      [toCartItem(item)]
    );
  }

  // Pizza
  if (has('pizza')) {
    const item = MENU.find((m) => m.id === 'pz-margherita')!;
    return withCartReply(
      `Go with the ${item.name} — ${item.description.toLowerCase()} ${formatPrice(item.price)}.`,
      'add_to_cart',
      [toCartItem(item)]
    );
  }

  // Dessert / sweet
  if (has('dessert', 'sweet', 'chocolate', 'cake')) {
    const item = MENU.find((m) => m.id === 'ds-lava')!;
    return withCartReply(
      `Save room for the ${item.name} — ${item.description.toLowerCase()} ${formatPrice(item.price)}.`,
      'add_to_cart',
      [toCartItem(item)]
    );
  }

  // Budget constraint
  const budgetMatch = message.match(/\$?(\d+)/);
  if (budgetMatch && has('budget', 'cheap', 'afford', 'only', 'under', 'have')) {
    const budget = Number(budgetMatch[1]);
    const affordable = MENU.filter((m) => m.price <= budget - 2).sort(
      (a, b) => b.rating - a.rating
    );
    if (affordable.length) {
      const item = affordable[0];
      return withCartReply(
        `For under $${budget}, I recommend the ${item.name} at ${formatPrice(item.price)} — it leaves you room in your budget and it's rated ${item.rating}/5.`,
        'add_to_cart',
        [toCartItem(item)]
      );
    }
    return {
      reply: `With a $${budget} budget, our best value is the Heirloom Bruschetta at $6.50 — light, fresh, and perfect as a starter.`,
    };
  }

  // Cart commands
  if (has('clear', 'empty', 'reset') && has('cart')) {
    return withCartReply('Done — I cleared your cart. What would you like to start fresh with?', 'clear_cart', []);
  }
  if (has('remove', 'delete') && has('cart')) {
    return {
      reply: 'Which item should I remove? You can tell me by name, like "remove the burger".',
    };
  }

  // Cart summary
  if (has('summary', 'cart', 'total', 'how much', 'checkout')) {
    return {
      reply:
        "Here's your current cart summary. Tap the cart icon in the corner to review items and proceed to checkout.",
      suggestedPrompts: ['Show desserts', 'Recommend something spicy', "I'm vegetarian"],
    };
  }

  // Greeting
  if (has('hi', 'hello', 'hey', 'start')) {
    return {
      reply:
        "Hey there! I'm Savora AI. Tell me what you're in the mood for, your budget, or any dietary needs — I'll find the perfect dish.",
      suggestedPrompts: ['Recommend something spicy', "I'm vegetarian", 'I only have $20'],
    };
  }

  // Default
  return {
    reply:
      "I can help with that! Tell me a craving, a budget, or a dietary preference and I'll recommend something. For example: 'I want something spicy under $15'.",
    suggestedPrompts: ['Recommend something spicy', 'Show desserts', 'I want burgers'],
  };
}

function withCartReply(
  reply: string,
  tool: string,
  cart: CartItem[]
): BackendChatResponse {
  const itemCount = cart.reduce((s, i) => s + i.quantity, 0);
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  return {
    reply,
    tool,
    cart,
    cartSummary: { itemCount, subtotal },
    suggestedPrompts: ['Show desserts', 'Something cheaper', "I'm vegetarian"],
  };
}

function toCartItem(item: (typeof MENU)[number]): CartItem {
  return {
    id: item.id,
    name: item.name,
    price: item.price,
    image: item.image,
    category: item.category,
    quantity: 1,
  };
}

function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

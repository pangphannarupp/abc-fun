
import { LetterData, Song } from './types';

export const ALPHABET: LetterData[] = [
  {
    id: 'A', upper: 'A', lower: 'a', word: 'Apple', icon: 'nutrition', color: '#f49d25',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiAKmMRrJT4hS30MSI3_pzgLtLHd2-gs4tWaLTzin2FY21RuTAFCXs1NLW-P3xxFpxgBM5kW-wvNr3vrJ8dvzpyKl8w5qWwzePw61js-jtjTY_dhK3Gvqm6nHVJKY5E8jmpLwWX8IzptI8hUGwQvSue-RXZCX770dznkS4j8PjRJAvx9EY46HY9YJ6iDIJoqoFb3GzJVoGAf8U1m1ZcaBF2Khe0NJxb4cRDgeRzI5NE3IHqVfqRrf4HybDAeYCPvPfvZEpQtmAURj9',
    description: 'A is for Apple, sweet and red!',
    examples: [
      { word: 'Apple', description: 'Red fruit', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiAKmMRrJT4hS30MSI3_pzgLtLHd2-gs4tWaLTzin2FY21RuTAFCXs1NLW-P3xxFpxgBM5kW-wvNr3vrJ8dvzpyKl8w5qWwzePw61js-jtjTY_dhK3Gvqm6nHVJKY5E8jmpLwWX8IzptI8hUGwQvSue-RXZCX770dznkS4j8PjRJAvx9EY46HY9YJ6iDIJoqoFb3GzJVoGAf8U1m1ZcaBF2Khe0NJxb4cRDgeRzI5NE3IHqVfqRrf4HybDAeYCPvPfvZEpQtmAURj9' },
      { word: 'Ant', description: 'Tiny insect', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHaYDo25ikhjKt3tedRqWxvkHDwlHSA_7gbMi8dBIYvgcAkHO0M7LcAgFz96dSxLWv8N7yJsperkF3TWfM6esd-gJ7n4lfWqF-YQ81dDatvBwGgMffXxW659O4tFvBSB4wPsCCuY8IFVMG-vEgE2sgsgDbYyjFLxD-ooiegRoHOIDkawvbB5UGREh01fvaajLU6d8Ik7FMP-7UXKLxJVii18b1GNEXC5qOpDWAiJjyIHilC8jWQ2-vHiIN4r0nwR7d2--eewzX6M5E' },
      { word: 'Airplane', description: 'Flies in sky', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJUV1t2AP4LAW7lT97KjDNK-U5APQco89gS2IovNY0KPz80vya20wqTLixf4B23N77QUjb_TDYIwT1OpMvbeyOnR8JM6d2r-Ct6pSXCtQzkR_3ZpKVlyaPleq1YlWH6FML--PSzUEPcVekXr8Q3_PH816UjZsPkR2fhDQ42kuvrsKgTGqDRMaMxS6FDHl_M6HUjqpoRq_hBxB1oJncxtyVEd2vxAKUpRpyu-joe0rteniiBvSpgPkaNYteqsT98CE3th52cr7tcRwE' },
      { word: 'Alligator', description: 'Big reptile', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc--6hGew8uUVE_wOWKrps0B29se1u9dzG0zQq0wgZBUPlS6m_KqWM4H4VREZo1wrQM68e2dMdi0cMZHa1QTOSAKlR3jYjbf0bCFBxfcXcXWFn3gi5zkLybg3_14f07B3NYthVO1U4kMjUMBqA2z2FlBNQjDF0mnfzYHuixOBq2Pp2sagJ24CU7XA2my4_hjrMwZB_kkmg51pA9v69217f58Yef9n7vTH5xpgDa7Jigqk7Z8q2w5l9zX1eggkY3ox62Yj7edt_oroJ' }
    ]
  },
  { id: 'B', upper: 'B', lower: 'b', word: 'Ball', icon: 'sports_soccer', color: '#f49d25', image: '', description: '', examples: [] },
  { id: 'C', upper: 'C', lower: 'c', word: 'Cat', icon: 'pets', color: '#f49d25', image: '', description: '', examples: [] },
  { id: 'D', upper: 'D', lower: 'd', word: 'Dog', icon: 'cruelty_free', color: '#f49d25', image: '', description: '', examples: [] },
  { id: 'E', upper: 'E', lower: 'e', word: 'Egg', icon: 'egg', color: '#f49d25', image: '', description: '', examples: [] },
  { id: 'F', upper: 'F', lower: 'f', word: 'Fish', icon: 'set_meal', color: '#f49d25', image: '', description: '', examples: [] },
  { id: 'G', upper: 'G', lower: 'g', word: 'Gold', icon: 'emoji_events', color: '#f49d25', image: '', description: '', examples: [] },
  { id: 'H', upper: 'H', lower: 'h', word: 'House', icon: 'home', color: '#f49d25', image: '', description: '', examples: [] },
  { id: 'I', upper: 'I', lower: 'i', word: 'Ice', icon: 'icecream', color: '#f49d25', image: '', description: '', examples: [] },
  { id: 'J', upper: 'J', lower: 'j', word: 'Juice', icon: 'emoji_food_beverage', color: '#f49d25', image: '', description: '', examples: [] },
  { id: 'K', upper: 'K', lower: 'k', word: 'Key', icon: 'vpn_key', color: '#f49d25', image: '', description: '', examples: [] },
  { id: 'L', upper: 'L', lower: 'l', word: 'Light', icon: 'wb_sunny', color: '#f49d25', image: '', description: '', examples: [] },
  { id: 'M', upper: 'M', lower: 'm', word: 'Moon', icon: 'dark_mode', color: '#f49d25', image: '', description: '', examples: [] },
  { id: 'N', upper: 'N', lower: 'n', word: 'Note', icon: 'music_note', color: '#f49d25', image: '', description: '', examples: [] },
  { id: 'O', upper: 'O', lower: 'o', word: 'Orange', icon: 'circle', color: '#f49d25', image: '', description: '', examples: [] },
  { id: 'P', upper: 'P', lower: 'p', word: 'Piano', icon: 'piano', color: '#f49d25', image: '', description: '', examples: [] },
  { id: 'Q', upper: 'Q', lower: 'q', word: 'Question', icon: 'help', color: '#f49d25', image: '', description: '', examples: [] },
  { id: 'R', upper: 'R', lower: 'r', word: 'Robot', icon: 'smart_toy', color: '#f49d25', image: '', description: '', examples: [] },
  { id: 'S', upper: 'S', lower: 's', word: 'Star', icon: 'star', color: '#f49d25', image: '', description: '', examples: [] },
  { id: 'T', upper: 'T', lower: 't', word: 'Tree', icon: 'park', color: '#f49d25', image: '', description: '', examples: [] },
  { id: 'U', upper: 'U', lower: 'u', word: 'Umbrella', icon: 'umbrella', color: '#f49d25', image: '', description: '', examples: [] },
  { id: 'V', upper: 'V', lower: 'v', word: 'Van', icon: 'local_shipping', color: '#f49d25', image: '', description: '', examples: [] },
  { id: 'W', upper: 'W', lower: 'w', word: 'Water', icon: 'water_drop', color: '#f49d25', image: '', description: '', examples: [] },
  { id: 'X', upper: 'X', lower: 'x', word: 'X-Ray', icon: 'radiology', color: '#f49d25', image: '', description: '', examples: [] },
  { id: 'Y', upper: 'Y', lower: 'y', word: 'Yacht', icon: 'sailing', color: '#f49d25', image: '', description: '', examples: [] },
  { id: 'Z', upper: 'Z', lower: 'z', word: 'Zigzag', icon: 'timeline', color: '#f49d25', image: '', description: '', examples: [] },
];

export const SONGS: Song[] = [
  { id: '1', title: 'The ABC Song', artist: 'Nursery Rhymes', duration: '2:23', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZIvMKA8RR6yI88udUlwAz7CeP9QjGCj4s-DLhXTXi2pN2W2D3m_otNKegSvObz7oZlAzmX6OSAKkVPPGa6gh4pUm3isoja2MXZG1C0Y3QYxExGdwvXTrU04De5XTz_PEWWv442kEWnIaN-NgSzcy2ayP-OERWcMJD0bsh8d3Zma-A20wl_9AHKKL49bEsxC1_DCXIlY8V_QmP_Zsc4CjrCeEQLDSNuRXylCg-t-EdyIBN6VaImoNZ1xjOgT3dKy1ueC3FWXbTN6VC', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: '2', title: 'A is for Ant', artist: 'Nursery Rhymes', duration: '2:00', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClc0MSmDWx5UyiAfmUeOCslMz47O0utRQbEI_jyRwqByjzb93fbJlu3T6DL6IiZAPYJQmpWIFBmdqOUU3vaRCNkXfHN57zKfa0RNNu_nvLtP5eQu7E26aGXjTmVZ7DIv3HFBNd-IRvTBduN_RYksc3-cYPxA0yDE2WrT7tDBALN6js7HKwz9wQkHz6bLjbwUXlNng3t-jvdVLUX4XUn-k84nw7FmK_9IIWserrOV4ZkRi9bk3oZHLybdVqfzbyrc12Fd_5QL3Tu7b1' },
  { id: '3', title: 'B is for Bear', artist: 'Nursery Rhymes', duration: '1:45', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiU5x1kmSjJ3x7ZkuU9hdO3bnlLPWeOErdjyk839cDOWfnMAx-XVyjf76Tz0TEYlpCn0LunfwfGPk5lxTnGqye9zxw9d9I_0uM-oc50E2RqqeJYejaPBGZalUwtGnA7L0NzqpzEFuJ-krliLzNZqOi6sbGF_uY4A8PwVQiKHr8ivXBwxdcUkfrz7LYdMsPuoXjVCABRzHCs_5Vl96gIVP2Ll_Xp5dCxjwdYoMvb39_MFqXvS6-s7QZMLbQ60zvpT895rY819oGv5bC' },
  { id: '4', title: 'Phonics Fun', artist: 'Learning Hub', duration: '3:10', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBff73lGEgX8Dk7OGDRuebUxUbFlK6eMJjCvLXom3TLRqWsDBkekFQ1Rt23sm7pSy_QbwsYNH9kzqizGT4hDp2Kkn0F7gUE-p6IGLrs6L1JQb6eH6Td-Ijyk2pdyHNpgmIvgwjYmGQ-GSVnUHYxNI1dxXECtdhVbcwI2X_Wv0EDGl7h2CAlT0-WPnbpykxSl4ExNOJZ8S0v9NhccDQtDsM0pBg7Pjx5d5yrdVNJJC0wZnj5Ffnt7L35hnuHd-c-VGegMhsxNcSE12xx' }
];

export const THEME_COLORS = [
  '#f49d25', // Default Orange
  '#ef4444', // Red 500
  '#f97316', // Orange 500
  '#f59e0b', // Amber 500
  '#eab308', // Yellow 500
  '#84cc16', // Lime 500
  '#22c55e', // Green 500
  '#10b981', // Emerald 500
  '#14b8a6', // Teal 500
  '#06b6d4', // Cyan 500
  '#0ea5e9', // Sky 500
  '#3b82f6', // Blue 500
  '#6366f1', // Indigo 500
  '#8b5cf6', // Violet 500
  '#a855f7', // Purple 500
  '#d946ef', // Fuchsia 500
  '#ec4899', // Pink 500
  '#f43f5e', // Rose 500
  '#78716c', // Stone 500
  '#64748b', // Slate 500
];

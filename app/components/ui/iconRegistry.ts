import {
  ArrowRight,
  ArrowUp,
  CircleAlert,
  ExternalLink,
  FileText,
  Github,
  ImageOff,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Youtube,
  Search,
  Sun,
  TriangleAlert,
  X,
} from 'lucide-vue-next'
import type { Component } from 'vue'

// Bukan `import * as` — hanya ikon yang benar-benar dipakai yang masuk bundle. Tambah entri saat benar-benar diperlukan.
export const iconRegistry = {
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  'circle-alert': CircleAlert,
  'external-link': ExternalLink,
  'file-text': FileText,
  'github': Github,
  'image-off': ImageOff,
  'instagram': Instagram,
  'linkedin': Linkedin,
  'mail': Mail,
  'menu': Menu,
  'moon': Moon,
  'youtube': Youtube,
  'search': Search,
  'sun': Sun,
  'triangle-alert': TriangleAlert,
  'x': X,
} satisfies Record<string, Component>

export type IconName = keyof typeof iconRegistry

export function isIconName(value: string): value is IconName {
  return value in iconRegistry
}

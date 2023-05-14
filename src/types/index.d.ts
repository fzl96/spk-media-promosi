import { User } from "@prisma/client"
import type { Icon } from "lucide-react"

import { Icons } from "@/components/icons"

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}

export type DocsConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type MarketingConfig = {
  mainNav: MainNavItem[]
}

export type DashboardConfig = {
  sidebarNav: SidebarNavItem[]
}

export type SubscriptionPlan = {
  name: string
  description: string
  stripePriceId: string
}

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd: number
    isPro: boolean
  }

  
export interface Evaluation {
    criteriaId: string;
    criteriaName: string;
    criteriaWeight: number;
    criteriaType: string;
    criteriaCode: string;
    nilai: number;
  }
  
export interface Alternative {
    id: string;
    name: string;
    evaluation: Evaluation[];
  }

export interface WeightedMatrix {
  id: string;
  name: string;
  weightedMatrix: {
      criteriaId: string;
      criteriaCode: string;
      criteriaName: string;
      criteriaType: string;
      weightedValue: number;
  }[];
}

export interface IdealValue {
  criteriaCode: string;
  criteriaName: string;
  idealValue: number;
}

export interface IdealValueId {
  id: string;
  name: string;
  idealValue: number;
}

export interface PreferenceValuesType {
  id: string;
  name: string;
  preferenceValues: number;
  rank: number;
}
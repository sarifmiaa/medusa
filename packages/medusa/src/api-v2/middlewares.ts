import { MiddlewaresConfig } from "../loaders/helpers/routing/types"
import { adminCampaignRoutesMiddlewares } from "./admin/campaigns/middlewares"
import { adminPromotionRoutesMiddlewares } from "./admin/promotions/middlewares"
import { adminCustomerRoutesMiddlewares } from "./admin/customers/middlewares"
import { adminCustomerGroupRoutesMiddlewares } from "./admin/customer-groups/middlewares"
import { storeCustomerRoutesMiddlewares } from "./store/customers/middlewares"

export const config: MiddlewaresConfig = {
  routes: [
    ...adminCustomerGroupRoutesMiddlewares,
    ...adminCustomerRoutesMiddlewares,
    ...adminPromotionRoutesMiddlewares,
    ...adminCampaignRoutesMiddlewares,
    ...storeCustomerRoutesMiddlewares,
  ],
}

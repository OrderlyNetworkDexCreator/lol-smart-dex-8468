import { MetaFunction } from "@remix-run/node";
import { generatePageTitle } from "@/utils/utils";
import { Dashboard, ReferralProvider } from "@orderly.network/affiliate";

export const meta: MetaFunction = () => {
  return [{ title: generatePageTitle("Affiliate") }];
};

export default function AffiliatePage() {
  return (
    <ReferralProvider
      becomeAnAffiliateUrl={import.meta.env.VITE_BECOME_AN_AFFILIATE_URL || "https://orderly.network"}
      learnAffiliateUrl={import.meta.env.VITE_LEARN_AFFILIATE_URL || "https://orderly.network"}
      referralLinkUrl={import.meta.env.VITE_REFERRAL_LINK_URL || "https://orderly.network"}
    >
      <Dashboard.AffiliatePage />
    </ReferralProvider>
  );
}
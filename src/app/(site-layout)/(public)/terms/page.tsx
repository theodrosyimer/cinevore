import { Icons } from '@/components/icon/icons'
import { Separator } from '@/components/ui/separator'

export const metadata = {
  title: 'Terms of Use Page',
  description: 'All you need to know about our terms of use',
}

export type TermsPageProps = {}

export default function TermsPage(props: TermsPageProps) {
  return (
    <>
      <div className="w-full space-y-6 pb-16">
        <div className="flex justify-center space-y-8 sm:space-x-12 lg:space-y-0">
          {/* <aside className="sticky top-0 z-50 w-full sm:w-1/5">
            <BackButton />
          </aside> */}
          {/* <div className="flex-1 lg:max-w-2xl"></div> */}
          <div className="flex flex-1 flex-col items-center justify-center md:flex-row lg:max-w-2xl">
            <div className="flex flex-col space-y-2 ">
              <Icons.logo className="mx-auto h-6 w-6" />
              <h1 className="text-center text-2xl font-semibold tracking-tight">
                Terms and conditions of use
              </h1>
              <Separator className="mb-10" />
              <p className="text-sm text-muted-foreground">
                By accessing and using{' '}
                <span className="font-bold italic">Cinevore.com</span> and any
                other site, application, API or embedded content owned or
                operated by
                {''}
                <span className="font-bold italic">
                  {' '}
                  Cinevore Limited{' '}
                </span>{' '}
                (the “Service”), you accept and agree to be bound by the
                following terms and conditions (“Terms”):
              </p>
              <ul>
                <li className="text-sm text-muted-foreground">
                  <span className="font-bold text-primary">Use</span>: You may
                  only use the Service in accordance with these Terms. All
                  rights not expressly granted to you in these Terms are
                  reserved by us.
                </li>
                <li className="text-sm text-muted-foreground">
                  <span className="font-bold text-primary">Responsibility</span>
                  : You will be responsible for all activity that occurs as a
                  result of your use of the Service. We disclaim any and all
                  liability (including for negligence) for the content,
                  opinions, statements or other information posted to, or use
                  of, the Service by its users.
                </li>
                <li className="text-sm text-muted-foreground">
                  <span className="font-bold text-primary">
                    Provision of information
                  </span>
                  : In order to use the services provided on the Service, you
                  must be at least 16 years of age. When you register to use the
                  Service, you agree to provide true, accurate, current and
                  complete information about yourself as prompted by the Service
                  (“Registration Information”), and to maintain and promptly
                  update your Registration Information in order to ensure that
                  it remains true, accurate, current and complete.
                </li>
                <li className="text-sm text-muted-foreground">
                  <span className="font-bold text-primary">
                    Community policy
                  </span>
                  : You must be courteous and respectful of others’ opinions,
                  and you must not post unwelcome, aggressive, suggestive or
                  otherwise inappropriate remarks directed at another member of
                  the Service. Read our full policy.
                </li>
                <li className="text-sm text-muted-foreground">
                  <span className="font-bold text-primary">Conduct</span>: You
                  must not use the Service to promote, engage in or incite hate,
                  violence, discrimination or intolerance, including based on
                  race, age, gender, gender identity, ethnicity, religion,
                  disability, sexual orientation or other protected attribute.
                  We reserve the right to remove content that has the potential
                  to harm communities we consider worthy of protection. We
                  reserve the right to consider off-platform behavior as part of
                  our moderating process. You must not use the Service (or
                  encourage others to use the Service) to create multiple
                  accounts, deceive or mislead other users, disrupt discussions,
                  circumvent account blocks, game the Service’s mechanics, alter
                  consensus, participate in orchestrated attacks against films
                  or filmmakers, post spam or otherwise violate our community
                  policy. You must not recreate or reproduce platform features
                  that are exclusively included with our paid accounts, either
                  through our API or another means. You must not follow an
                  excessively high number of accounts (or like an excessive
                  number of reviews or lists) in order to generate reciprocal
                  follows or likes and thereby manipulate your account’s
                  popularity.{' '}
                </li>
                <li className="text-sm text-muted-foreground">
                  <span className="font-bold text-primary">
                    No malicious use
                  </span>
                  : You agree to access the Service through the interface we
                  provide. You must not use the Service for any malicious means,
                  or abuse, harass, threaten, intimidate or impersonate any
                  other user of the Service or any{' '}
                  <span className="font-bold italic text-primary">
                    Cinevore
                  </span>{' '}
                  employee. You must not request or attempt to solicit personal
                  or identifying information from another member of the Service.
                  You must not mislead the Service’s support or moderation
                  representatives, such as by making false or malicious reports
                  about other members or their content, or by sending (or
                  encouraging others to send) multiple reports regarding the
                  same content or issue. Such behaviors may result in action
                  being taken on your account.
                </li>
                <li className="text-sm text-muted-foreground">
                  <span className="font-bold text-primary">No illegal use</span>
                  : You must not use the Service for any unlawful purpose, or
                  post any information that is in breach of any confidentiality
                  obligation, copyright, trade mark or other intellectual
                  property or proprietary rights of any person.
                </li>
                <li className="text-sm text-muted-foreground">
                  <span className="font-bold text-primary">
                    Removal of content
                  </span>
                  : We reserve the right to remove any content posted to the
                  Service that we consider (in our absolute discretion) to be
                  offensive, objectionable, unlawful, explicit, graphic or
                  otherwise in breach of these Terms, including content that
                  expressly (or implicitly, through coded language, symbol,
                  keywords or tags) praises, supports, promotes or represents
                  white-nationalist or neighboring ideologies. We reserve the
                  right to remove any content posted to the Service that
                  disseminates misinformation and its related manipulations,
                  including viral sloganeering.
                </li>
                <li className="text-sm text-muted-foreground">
                  <span className="font-bold text-primary">
                    Subscription fees
                  </span>
                  : We may charge subscription fees for the use of certain
                  services offered on the Service (“Fees”). We may change the
                  amount of Fees payable from time to time. We will communicate
                  any changes in Fees, and any changes will only take effect at
                  the end of your current subscription period. If you cancel
                  your subscription within 30 days of its inception, you may
                  seek a refund for any Fees you have already paid in the
                  current period. Refunds are granted at the sole discretion of
                  the Service’s support staff, and are only available for
                  subscriptions purchased through our website (iOS subscribers
                  must contact Apple, Inc. if they wish to seek a refund).
                  Subscriptions purchased through our website are processed by
                  Paddle.com and those purchased through our iOS app are
                  processed by Apple, Inc. (these companies, collectively the
                  “Resellers”, are the Merchant of Record for your purchase).
                  Customer enquiries related to subscriptions should be sent to
                  the Service’s support staff. By subscribing to an annual plan,
                  you agree to pay the Service (through one of the Resellers)
                  the subscription fees indicated for that plan. Payments will
                  be charged in advance on the day you subscribe to the plan and
                  will cover your use of the upgraded Service (including all
                  activity across our website and apps) for a period of one
                  year. Unless you cancel your subscription before the end of
                  the current period, your subscription will automatically renew
                  and you authorize the applicable Reseller to collect the
                  annual subscription fee for the next period (including any
                  taxes payable) using the payment method they have on record
                  for you. Subscriptions can be canceled at any time in your
                  account settings (for web subscriptions) or in your iCloud
                  settings (for iOS subscriptions).
                </li>
                <li className="text-sm text-muted-foreground">
                  <span className="font-bold text-primary">
                    Intellectual property
                  </span>
                  : You agree that we own all of the intellectual property
                  rights in the Service. You grant us a non-exclusive,
                  royalty-free, irrevocable, perpetual and sub-licensable right
                  to use, reproduce, distribute and display (including for
                  commercial purposes) on the Service and in other media any
                  content or material that you post on the Service, and any
                  name(s) and/or avatar under which you post such content. Other
                  than this right, we claim no intellectual property rights in
                  relation to the information or content that you upload onto
                  the Service. Any content you post to the Service should be
                  original (not plagiarized from another person’s writing) and
                  must not infringe anyone else’s intellectual property rights.
                  Where you are referencing someone else’s intellectual
                  property, you must make this clear by naming the quoted
                  material’s author and through the use of identifiers such as
                  quotation marks, links to source material, or other means.
                </li>
                <li className="text-sm text-muted-foreground">
                  <span className="font-bold text-primary">Indemnity</span>: You
                  indemnify, and will keep indemnified, us against all forms of
                  liability, actions, proceedings, demands, costs, charges and
                  expenses which we may howsoever incur or be subject to or
                  suffer as a result of the use by you of the Service.
                </li>
                <li className="text-sm text-muted-foreground">
                  <span className="font-bold text-primary">Amendments</span>: We
                  reserve the right to amend these Terms at any time, including
                  by changing the amount of any Fees payable for any of our
                  services, and may also add new features that will be subject
                  to these Terms. If these changes are material we will
                  communicate the changes to users, and by continuing to use the
                  Service, you will be taken to have agreed to the changes.
                </li>
                <li className="text-sm text-muted-foreground">
                  <span className="font-bold text-primary">
                    Use of our logo
                  </span>
                  : Subject to these Terms, we grant you a non-exclusive limited
                  licence to use our{' '}
                  <span className="font-bold italic text-primary">
                    Cinevore
                  </span>{' '}
                  logo when linking to the Service. Please download our logo
                  file here. Each link on the “Letterboxd logos” page contains a
                  version of our logo in one of several common formats. You must
                  comply with any instructions that we may give you from time to
                  time about your use of our logo. You must not alter our logo
                  in any way; use our logo in a way that suggests any type of
                  association or partnership with us; use our logo in a way that
                  is harmful, deceptive, obscene or otherwise objectionable to
                  the average person; or use our logo to, or in connection with,
                  content that disparages us or damages our reputation.
                </li>
                <li className="text-sm text-muted-foreground">
                  <span className="font-bold text-primary">
                    Third-party applications
                  </span>
                  : We may provide a platform for third parties’ applications,
                  websites and services to make products and services available
                  to you (“Third-Party Applications”) and your use of any
                  Third-Party Applications will be subject to their terms of
                  use. You agree that we will not be liable for the behavior,
                  features or content of any Third-Party Applications.
                </li>
                <li className="text-sm text-muted-foreground">
                  <span className="font-bold text-primary">
                    Termination or suspension of accounts
                  </span>
                  : If you do not abide by these Terms, we may suspend or
                  terminate your account.
                </li>
                <li className="text-sm text-muted-foreground">
                  <span className="font-bold text-primary">
                    Technical support and malfunctions
                  </span>
                  : We will try to promptly address (during normal business
                  hours) all technical issues that arise on the Service.
                  However, we will not be liable for any loss suffered as a
                  result of any partial or total breakdown of the Service or any
                  technical malfunctions.
                </li>
                <li className="text-sm text-muted-foreground">
                  <span className="font-bold text-primary">
                    Governing law and jurisdiction
                  </span>
                  : All users of the Service agree that the laws of New Zealand
                  shall govern and apply to these Terms and each user’s use of
                  the Service, and all users submit to the exclusive
                  jurisdiction of the New Zealand courts for any matter or
                  dispute arising in relation to these Terms.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

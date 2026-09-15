import { insightsMeta } from '../data/insights.js'
import { profile } from '../data/profile.js'
import { itemLabels, terms } from './pricing.en.js'

// 영어 사이트 문구 (한국어 사이트를 그대로 번역)
export function createEnCopy({ i, f, account, pricing }) {
  const [y, m, d] = insightsMeta.collectedAt.split('-')

  return {
    htmlLang: 'en',
    languageName: 'English',
    nav: {
      label: 'Main menu',
      items: [
        { href: '#about', label: 'Audience' },
        { href: '#metrics', label: 'Metrics' },
        { href: '#rates', label: 'Rates' },
        { href: '#calculator', label: 'Calculator' },
        { href: '#process', label: 'Process' },
        { href: '#contact', label: 'Contact' },
      ],
      languageLabel: 'Select language',
    },
    hero: {
      introLines: [
        'A lifestyle account built around wood-toned interiors,',
        'home café moments and newlywed living',
      ],
      introSub:
        'Products are introduced naturally inside a real home, which makes this account a strong fit for interior, furniture and household brands',
      photos: [
        {
          file: '01.jpg',
          alt: 'Living room at night with an orange sofa, wooden dining table and bookshelves',
        },
        { file: '02.jpg', alt: 'Orange sofa and dining table in front of a wall lit by a projector' },
        { file: '03.jpg', alt: 'Desk setup with a monitor, plants and wooden accessories' },
        { file: '04.jpg', alt: 'Room corner with a green lounge chair, guitar and wooden shelf' },
        { file: '05.jpg', alt: 'Sunlit wood-toned living room with plants on the balcony' },
      ],
      photoCaption: 'WOOD · HOME CAFÉ · NEWLYWED',
      cardLabel: 'Account overview',
      stats: [
        { label: 'Followers', value: f.num(i.followers), unit: '' },
        { label: 'Non-follower views', value: f.pct(i.nonFollowerViewShare, 0), unit: '' },
        { label: 'Avg. Reels reach', value: f.approx(i.reachMean), unit: '' },
        { label: 'Median Reels reach', value: f.approx(i.reachMedian), unit: '' },
      ],
      meta: ({ days, months }) =>
        `Opened ${account.y}.${account.m}.${account.d} · day ${days} (about ${months} months) · ${profile.posts} posts · 2–3 posts a week`,
      actions: { calculator: 'Calculate a budget', contact: 'Start a campaign' },
      slider: {
        prev: 'Previous photo',
        next: 'Next photo',
        bullet: 'Go to photo {{index}}',
      },
    },
    audience: {
      eyebrow: 'Audience',
      title: 'Who is watching',
      desc: 'From wedding planning to setting up a first home, the audience is in their 20s–30s and cares about living spaces.',
      targets: [
        { title: 'Couples to be', desc: 'Couples in their 20s–30s planning a wedding' },
        { title: 'Newlyweds', desc: 'Newlyweds in their 20s–30s settling into a new home' },
        {
          title: 'Wood-toned interiors',
          desc: 'People who love walnut tones, cottage interiors and solid wood furniture',
        },
        { title: 'Home café', desc: 'People into home cafés, coffee and a café-like mood at home' },
        { title: 'Tidy living', desc: 'People who want a home that looks good and stays tidy' },
        { title: 'Flowers · plants', desc: 'Women in their 20s–30s who love flowers and houseplants' },
      ],
      info: [
        { label: 'Main categories', value: 'Living · Interior · Wedding' },
        { label: 'Main followers', value: 'South Korea · 20s–30s · women' },
        { label: 'Posting frequency', value: '2–3 posts a week (carousels and Reels)' },
      ],
    },
    metrics: {
      eyebrow: 'Performance',
      title: 'Key account metrics',
      desc: `Instagram Insights · collected ${y}.${m}.${d}`,
      summary: (
        <>
          Across the last {i.reelCount} Reels, average reach was about {f.approx(i.reachMean)} accounts and
          median reach about {f.approx(i.reachMedian)}. Over the last 90 days,{' '}
          <strong>{f.pct(i.nonFollowerViewShare, 0)} of all views came from non-followers</strong>, which
          shows the account keeps reaching new potential customers.
        </>
      ),
      reelsLabel: 'Last 10 Reels',
      reelsNote: i.promoCount > 0 ? `includes ${i.promoCount} sponsored post` : '',
      accountLabel: 'Whole account · last 90 days',
      reelCards: [
        {
          label: 'Average reach',
          value: `~${f.approx(i.reachMean)}`,
          unit: '',
          sub: `About ${i.reachMeanMultiple.toFixed(1)}× the follower count`,
          tone: 'strong',
        },
        {
          label: 'Median reach',
          value: `~${f.approx(i.reachMedian)}`,
          unit: '',
          sub: `About ${i.reachMedianMultiple.toFixed(1)}× followers · conservative baseline`,
          tone: 'strong',
        },
        {
          label: 'Average views',
          value: f.num(i.viewsMean),
          unit: '',
          sub: `Median ${f.num(i.viewsMedian)} · peak ${f.num(i.viewsMax)}`,
        },
        {
          label: 'Average engagement',
          value: f.pct(i.engagementRate),
          sub: `${f.num(i.interactions)} likes, comments, saves and shares against reach`,
        },
        { label: 'Share rate', value: f.pct(i.shareRate), sub: `Peak ${f.pct(i.shareRateMax)}` },
        { label: 'Save rate', value: f.pct(i.saveRate), sub: `Peak ${f.pct(i.saveRateMax)}` },
      ],
      accountCards: [
        { label: 'Followers', value: f.num(i.followers), unit: '' },
        {
          label: 'Non-follower views',
          value: f.pct(i.nonFollowerViewShare, 0),
          sub: `${f.compact(i.accountViews)} views in total`,
          tone: 'strong',
        },
        {
          label: 'Non-follower engagement',
          value: f.pct(i.nonFollowerInteractionShare, 1),
          sub: `${f.compact(i.accountInteractions)} interactions in total`,
        },
        {
          label: 'Profile visit rate',
          value: f.pct(i.profileVisitRate),
          sub: `${f.num(i.profileVisits)} visits from ${f.compact(i.reachedAccounts)} accounts reached`,
        },
        {
          label: 'Link click rate',
          value: f.pct(i.linkPerVisitRate),
          sub: `${f.num(i.linkTaps)} clicks against profile visits`,
        },
      ],
      promo: {
        eyebrow: 'Sponsored Content',
        title: 'Engagement holds up on sponsored posts',
        body: (
          <>
            The last {i.promoContentCount} sponsored posts averaged <strong>{f.pct(i.promoRate)}</strong>{' '}
            engagement, close to the {f.pct(i.organicSimpleRate)} average of regular content. Individual posts
            ranged from {f.pct(i.promoRateMin, 1)} to {f.pct(i.promoRateMax, 1)}, and posts with clear product
            information drew relatively more saves and comments.
          </>
        ),
        compare: [
          { label: `${i.promoContentCount} sponsored posts`, value: f.pct(i.promoRate) },
          { label: `${i.organicCount} regular posts`, value: f.pct(i.organicSimpleRate) },
        ],
        stats: [
          { label: 'Avg. views', value: f.num(i.promoAverages.views) },
          { label: 'Avg. accounts reached', value: f.num(i.promoAverages.reach) },
          { label: 'Like rate', value: f.pct(i.promoAverages.likeRate) },
          { label: 'Comment rate', value: f.pct(i.promoAverages.commentRate) },
          { label: 'Save rate', value: f.pct(i.promoAverages.saveRate) },
          { label: 'Share rate', value: f.pct(i.promoAverages.shareRate) },
          { label: 'Avg. watch time', value: `${i.promoAverages.watchSeconds}s` },
        ],
      },
      footnotes: [
        `Average reach includes one viral post that reached ${f.num(i.reachMax)} accounts, so the median is used as the realistic baseline.`,
        `Engagement, save and share rates divide all interactions across the last ${i.reelCount} Reels by total reach.`,
        'Per-post link click data is not available, so the link click rate is measured across the whole account.',
        `Sponsored metrics are a simple average of each of the ${i.promoContentCount} posts, and regular content is averaged the same way across the ${i.organicCount} non-sponsored Reels.`,
      ],
    },
    strengths: {
      eyebrow: 'Strengths',
      title: 'What this account does well',
      quote: (
        <>
          Content that reaches new potential customers and keeps earning saves and comments even when it is
          labelled as an ad.
          <br />A good fit for interior and household products shown inside a real home.
        </>
      ),
      items: [
        {
          title: 'Reach well beyond the follower count',
          stat: `${i.reelsAboveTwiceFollowers} / ${i.reelCount}`,
          desc: `${i.reelsAboveTwiceFollowers} of the last ${i.reelCount} Reels reached more than twice the follower count.`,
        },
        {
          title: 'Engagement holds on sponsored posts',
          stat: f.pct(i.promoRate),
          desc: `Average engagement across ${i.promoContentCount} sponsored posts, close to regular content.`,
        },
        {
          title: 'Saves that signal purchase intent',
          stat: f.pct(i.promoAverages.saveRate),
          desc: 'Average save rate on sponsored posts, with informative content drawing relatively more saves.',
        },
        {
          title: 'Products shown in a real home',
          stat: 'Real Home',
          desc: 'Real usage scenes give products an everyday tone rather than an advertising one.',
        },
      ],
    },
    rateCard: {
      eyebrow: 'Rate Card',
      title: 'Products and rates',
      desc: 'All rates include VAT.',
      groups: pricing.productGroups,
      badge: itemLabels['pkg-feed-reels'].badge,
      termsTitle: 'Terms',
      terms,
      extrasTitle: 'Add-ons and further use',
      extrasHead: { request: 'Request', price: 'Additional cost' },
      extras: pricing.extras,
      extrasNote:
        'Meta ads, product page use and raw files are separate rights and are not included in the base rate.',
    },
    rationale: {
      eyebrow: 'Pricing Basis',
      title: 'How these rates are set',
      text: 'Rates combine average performance, production difficulty, category fit, and the scope of shooting and editing. They are based on the average performance of a single post rather than one viral hit.',
      reasons: [
        `Median reach is about ${i.reachMedianMultiple.toFixed(1)}× the follower count.`,
        `${i.reelsAboveTwiceFollowers} of the last ${i.reelCount} Reels reached more than twice the follower count.`,
        `${f.pct(i.nonFollowerViewShare, 0)} of views over the last 90 days came from non-followers.`,
        `Sponsored posts average ${f.pct(i.promoRate)} engagement, close to regular content (${f.pct(i.organicSimpleRate)}).`,
        'Rates are not raised across the board on performance alone; they follow the scope and difficulty of production.',
        'The account topic is a close fit for interior and household brands.',
      ],
    },
    calculator: {
      eyebrow: 'Estimate',
      title: 'Budget calculator',
      desc: 'Pick the products and options you need and the estimated budget appears right away.',
      steps: {
        products: 'Choose products',
        productsHint: 'You can combine products and change the quantity.',
        retention: 'Content retention',
        extras: 'Add-ons',
      },
      videoOnly: 'Available with Reels or the Feed + Reels package',
      quantity: (name) => `${name} quantity`,
      decrease: (name) => `Decrease ${name} quantity`,
      increase: (name) => `Increase ${name} quantity`,
      summary: {
        title: 'Estimate',
        reset: 'Reset',
        negotiable: 'To be discussed',
        totalLabel: 'Estimated budget · VAT included',
        negotiableNote: (count) =>
          `${count} item${count > 1 ? 's' : ''} to be discussed ${count > 1 ? 'are' : 'is'} not included in this amount.`,
        rangeNote: 'Range rates are confirmed after discussing the shooting difficulty and scope.',
        mail: 'Send this estimate by email',
        copy: 'Copy estimate (for DM)',
        copied: 'Copied ✓',
        copyFallback: 'Please copy the estimate below.',
        emptyLines: ['Choose a product to see', 'your estimated budget here.'],
        disclaimer:
          'This is a reference estimate. The final quote may change with the scope and schedule of the campaign.',
      },
      bar: { label: 'Estimated budget', open: 'View estimate' },
    },
    process: {
      eyebrow: 'Process',
      title: 'How a campaign runs',
      desc: 'Production usually takes the following time after the product arrives.',
      leadTimes: [
        { label: 'Feed content', value: 'About 5–7 days' },
        { label: 'Reels content', value: 'About 7–14 days' },
      ],
      stepLabel: (index) => `STEP ${index}`,
      steps: [
        {
          title: 'Campaign enquiry',
          desc: 'Share the brand, product, content type you have in mind, preferred upload date and budget.',
        },
        {
          title: 'Campaign details',
          desc: 'We agree on product features, required messages, hashtags, mentions, links, ad disclosure and content direction.',
        },
        {
          title: 'Quote and schedule',
          desc: 'Content type, production scope, rate, revisions, usage rights and the upload date are confirmed.',
        },
        {
          title: 'Product delivery and production',
          desc: 'Filming and editing start once the product arrives. Timing can shift with the product or shooting conditions.',
        },
        {
          title: 'Draft review',
          desc: 'A draft is shared when needed, with one revision included. Full rewrites beyond typos or missing information may cost extra.',
        },
        {
          title: 'Upload and results',
          desc: 'The content goes live on the agreed date, and the post link with the available performance data follows.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Start a campaign',
      desc: 'Please send an Instagram DM or an email including the details below.',
      dm: `Instagram DM @${profile.handle}`,
      checklist: [
        'Brand and contact name',
        'Product name and product link',
        'Content type: feed / Reels / story',
        'Preferred upload date',
        'Campaign details and must-have requests',
        'Budget',
        'Whether the content will be reused',
        'Product and shipping arrangements',
      ],
    },
    quote: {
      heading: `[Campaign estimate · @${profile.handle}]`,
      selected: '■ Selected items',
      negotiableHeading: '■ To be discussed',
      total: (range) => `■ Estimated budget (VAT included): ${range}`,
      negotiableNote: '  * Items to be discussed are not included in this amount.',
      rangeNote: '  * Range rates are confirmed after discussing the shooting difficulty and scope.',
      campaignHeading: '■ Campaign details',
      campaignFields: [
        '- Brand / contact name: ',
        '- Product name / link: ',
        '- Preferred upload date: ',
        '- Campaign details and must-have requests: ',
        '- Product and shipping arrangements: ',
      ],
      retentionLabel: (label) => `Content retention ${label}`,
      mailSubject: `[Campaign enquiry] @${profile.handle} estimate`,
    },
  }
}

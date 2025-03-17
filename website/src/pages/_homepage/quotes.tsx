import React, { ComponentProps } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import clsx from "clsx";
import TweetQuote from "@site/src/components/TweetQuote";

import styles from "./quotes.module.css";

export function Quote(props: ComponentProps<typeof TweetQuote>) {
  return (
    <div className={styles.quoteContainer}>
      <TweetQuote {...props} />
    </div>
  );
}

export const AllQuotes = {
  en: {
    tkdodo: (
      <Quote
        url="https://twitter.com/TkDodo/status/1661337628875137027"
        handle="TkDodo"
        github="TkDodo"
        name="Dominik Dorfmeister"
        job="Web Developer - React-Query maintainer"
      >
        I'm constantly finding interesting things to learn in there.
      </Quote>
    ),
    theo: (
      <Quote
        url="https://www.youtube.com/clip/UgkxDdNASo6xNS710ODcjMx0WW4HtTxIYbrA"
        handle="theo"
        github="t3dotgg"
        name="Theo Browne"
        job="Founder of ping.gg - Youtuber"
      >
        One of the few things I regularly read to keep up with the React world.
      </Quote>
    ),
    jackherrington: (
      <Quote
        // url={undefined} // Email testimonial
        // not exactly the same testimonial but still cool to have a public link!
        url="https://twitter.com/jherr/status/1666578571912171520"
        handle="jherr"
        github="jherr"
        name="Jack Herrington"
        job="Principal Engineer - Youtuber"
      >
        People always ask how I keep up to date, it's This Week In React.
      </Quote>
    ),
    addyosmani: (
      <Quote
        url={undefined} // email testimonial
        handle="addyosmani"
        github="addyosmani"
        name="Addy Osmani"
        job="Head of Chrome DX - Google"
      >
        It's exceptionally well curated, offers great insights and is well worth
        subscribing to!
      </Quote>
    ),
    evanbacon: (
      <Quote
        url="https://twitter.com/Baconbrix/status/1622655092657688576"
        handle="Baconbrix"
        github="EvanBacon"
        name="Evan Bacon"
        job="Engineering Manager - Expo"
      >
        My favorite resource for keeping up with the React community!
      </Quote>
    ),
    grabbou: (
      <Quote
        url="https://x.com/grabbou/status/1829126194022715617"
        handle="grabbou"
        github="grabbou"
        name="Mike Grabowski"
        job="CTO and founder - Callstack"
      >
        If every newsletter was as informative, the world would be a better
        place!
      </Quote>
    ),
    wcandillon: (
      <Quote
        url="https://twitter.com/wcandillon/status/1263825118557593600"
        handle="wcandillon"
        github="wcandillon"
        name="William Candillon"
        job="React-Native animations expert - Youtuber"
      >
        If you are not signed-up, you are missing out
      </Quote>
    ),
    threepointone: (
      <Quote
        url="https://twitter.com/threepointone/status/1493894062293794817"
        handle="threepointone"
        github="threepointone"
        name="Sunil Pai"
        job="Engineer - ex React core team"
      >
        The one React newsletter/source of "what's new" that I follow
      </Quote>
    ),
    kzzzf: (
      <Quote
        url="https://twitter.com/kzzzf/status/1650802159502467073"
        handle="kzzzf"
        github="kzzzf"
        name="Krzysztof Magiera"
        job="Director of engineering - SWM"
      >
        With so much going on in the React and React Native world, this is the
        only way to stay well-informed
      </Quote>
    ),
    michal: (
      <Quote
        url="https://twitter.com/thymikee"
        handle="thymikee"
        github="thymikee"
        name="Michal Pierzchala"
        job="Head of Technology - Callstack"
      >
        I try to keep up with React (Native) news daily. But when I can't, I
        know I can always rely on Seb's newsletter
      </Quote>
    ),
    kentcdodds: (
      <Quote
        url="https://twitter.com/kentcdodds/status/1389240652324474880"
        handle="kentcdodds"
        github="kentcdodds"
        name="Kent C. Dodds"
        job="Developer Experience - Remix"
      >
        These threads you do are awesome
      </Quote>
    ),
    sebmarkbage: (
      <Quote
        url="https://twitter.com/sebmarkbage/status/1557365971182145543"
        handle="sebmarkbage"
        github="sebmarkbage"
        name="Sebastian Markbåge"
        job="Engineer at Vercel - React core team"
      >
        Feels like such an institution that has always been there and will
        always be there
      </Quote>
    ),
    yangshunz: (
      <Quote
        url="https://twitter.com/yangshunz/status/1511641180907323393"
        handle="yangshunz"
        github="yangshun"
        name="Yangshun Tay"
        job="Staff Front End Engineer at Meta"
      >
        Really useful for me as someone who doesn't use Twitter that often
      </Quote>
    ),
    simongrimm: (
      <Quote
        url="https://twitter.com/schlimmson/status/1669238968259411969"
        handle="schlimmson"
        github="saimon24"
        name="Simon Grimm"
        job="React-Native course author"
      >
        The one thing that helped me most to get into the whole React ecosystem
      </Quote>
    ),
    NoriSte: (
      <Quote
        url="https://twitter.com/NoriSte/status/1448145180461355008"
        handle="NoriSte"
        github="NoriSte"
        name="Stefano Magni"
        job="Front-end Tech Lead at Hasura"
      >
        It's like reading a summary instead of scanning Twitter
      </Quote>
    ),
    ericclemmons: (
      <Quote
        url="https://twitter.com/ericclemmons/status/1519304291609198592"
        handle="ericclemmons"
        github="ericclemmons"
        name="Eric Clemmons"
        job="Staff Engineer at Stripe"
      >
        The closest thing we have to Oscars is Sebastien Lorber’s weekly roundup
      </Quote>
    ),
    swmansion: (
      <Quote
        url="https://twitter.com/swmansion/status/1496225215730397187"
        handle="swmansion"
        github="software-mansion"
        name="Software Mansion"
        job="React-Native & Expo experts"
      >
        A high-quality newsletter with all the most important news from the
        React world
      </Quote>
    ),
    amanhimself: (
      <Quote
        url="https://twitter.com/amanhimself/status/1450753646082150401"
        handle="amanhimself"
        github="amandeepmittal"
        name="Aman Mittal"
        job="Developer & Tech Writer"
      >
        My goto gateway for what’s happening in React
      </Quote>
    ),
    Jonsamp: (
      <Quote
        url="https://twitter.com/Jonsamp/status/1471222654338314240"
        handle="Jonsamp"
        github="Jonsamp"
        name="Jon Samp"
        job="Software Developer at Expo"
      >
        This newsletter might just replace Twitter for me
      </Quote>
    ),
    peterpme: (
      <Quote
        url="https://twitter.com/peterpme/status/1626958088669470720"
        handle="peterpme"
        github="peterpme"
        name="Peter Piekarczyk"
        job="Founded Draftbit"
      >
        Never a dull moment when reading This Week In React.
      </Quote>
    ),
    johnnyreilly: (
      <Quote
        url="https://twitter.com/johnny_reilly/status/1477359594087321600"
        handle="johnny_reilly"
        github="johnnyreilly"
        name="John Reilly"
        job="Group Principal Engineer at Investec"
      >
        Sebastien helps us learn the things we need to learn
      </Quote>
    ),
    mcavaliere: (
      <Quote
        url="https://twitter.com/mcavaliere/status/1371512182178000897"
        handle="mcavaliere"
        github="mcavaliere"
        name="Mike Cavaliere"
        job="Director of Partnerships - Echobind"
      >
        I can see important React news at a glance.
      </Quote>
    ),
    dmitry: (
      <Quote
        url="https://twitter.com/blvdmitry/status/1694620256793194687"
        handle="blvdmitry"
        github="blvdmitry"
        name="Dmitry Belyaev"
        job="Principal Engineer - Booking.com"
      >
        It became my main source of front-end content. I now recommend it to
        everyone.
      </Quote>
    ),
    ane_naiz: (
      <Quote
        url="https://twitter.com/ane_naiz/status/1442606436207497216"
        handle="ane_naiz"
        github="anediaz"
        name="Ane Diaz"
        job="Software Engineer - Datadog"
      >
        I won't miss any information from now on
      </Quote>
    ),
    elijahmanor: (
      <Quote
        url="https://twitter.com/elijahmanor/status/1528748108330504193"
        handle="elijahmanor"
        github="elijahmanor"
        name="Elijah Manor"
        job="Senior Software Engineer - Planview"
      >
        If you are a React dev, this is a newsletter you should check out
      </Quote>
    ),
    asidorenko_: (
      <Quote
        url="https://twitter.com/asidorenko_/status/1479029650496102402"
        handle="asidorenko_"
        github="SidKH"
        name="Alex Sidorenko"
        job="Senior Software Engineer - Blogger"
      >
        Probably the best resource out there if you want to stay up to date with
        React
      </Quote>
    ),
    beaussan: (
      <Quote
        url="https://twitter.com/beaussan/status/1488578333851930627"
        handle="beaussan"
        github="beaussan"
        name="Nicolas Beaussart"
        job="Principal Engineer - Hasura"
      >
        Your threads and newletter are a gem !
      </Quote>
    ),
    wbroek: (
      <Quote
        url="https://twitter.com/wbroek/status/1479017874798829569"
        handle="wbroek"
        github="wbroek"
        name="Wouter Broek"
        job="Software Development Manager - AWS"
      >
        If you do react you should definitely take a look
      </Quote>
    ),
    fredmaiaarantes: (
      <Quote
        url="https://twitter.com/fredmaiaarantes/status/1545399680783323136"
        handle="fredmaiaarantes"
        github="fredmaiaarantes"
        name="Fred Maia Arantes"
        job="CEO - MeteorJS"
      >
        If you are into React, you should subscribe
      </Quote>
    ),
    ndubien: (
      <Quote
        url="https://twitter.com/ndubien/status/1445627346275373056"
        handle="ndubien"
        github="dubzzz"
        name="Nicolas Dubien"
        job="Software Engineer - Pigment"
      >
        A high quality thread for developers working with React
      </Quote>
    ),
    jamonholmgren: (
      <Quote
        url="https://twitter.com/jamonholmgren/status/1488926895450198017"
        handle="jamonholmgren"
        github="jamonholmgren"
        name="Jamon Holmgren"
        job="Founder/CTO of Infinite Red"
      >
        hit up Seb, he publishes a great React+RN newsletter!
      </Quote>
    ),
    frankdilo: (
      <Quote
        url="https://twitter.com/frankdilo/status/1391828520922279936"
        handle="frankdilo"
        github="frankdilo"
        name="Francesco Di Lorenzo"
        job="Co-founder of Mailbrew & Typefully"
      >
        A great follow. These weekly recap threads are a great format.
      </Quote>
    ),
    ElaziziYoussouf: (
      <Quote
        url="https://twitter.com/ElaziziYoussouf/status/1338448625677066240"
        handle="ElaziziYoussouf"
        github="yjose"
        name="Youssouf El Azizi"
        job="Mobile Tribe lead - OBytes"
      >
        Always enjoy reading Sebastien Lorber newsletter 👌
      </Quote>
    ),
    __marcin_: (
      <Quote
        url="https://twitter.com/__marcin_/status/1480988303130304526"
        handle="__marcin_"
        github="mobily"
        name="Marcin Dziewulski"
        job="Senior Software Engineer - Intent"
      >
        The most comprehensive newsletter for React (Native) developers
      </Quote>
    ),
    Danny_H_W: (
      <Quote
        url="https://twitter.com/Danny_H_W/status/1468285893203144713"
        handle="Danny_H_W"
        github="dannyhw"
        name="Daniel Williams"
        job="Senior Frontend developer - Coverflex"
      >
        Your weekly newsletter is my favourite source of tech news
      </Quote>
    ),
    Thierryskoda: (
      <Quote
        url="https://twitter.com/Thierryskoda/status/1440272076800094211"
        handle="thskod"
        github="thierryskoda"
        name="Thierry Skoda"
        job="Developer - Hack House Web3"
      >
        I feel that I never miss out on anything
      </Quote>
    ),
    dev_bogdan: (
      <Quote
        url="https://www.linkedin.com/feed/update/urn:li:activity:6892034593856577536/"
        handle="dev_bogdan"
        github="bogadrian"
        name="Adrian Bogdan"
        job="Software Engineer - Moojo"
      >
        I am learning a lot from Sebastien Lorber
      </Quote>
    ),
  },

  fr: {
    xavier_seignard: (
      <Quote
        url="https://twitter.com/xavier_seignard/status/1511793034979168261"
        handle="xavier_seignard"
        github="xseignard"
        name="Xavier Seignard"
        job="Senior Software Engineer - Alan"
      >
        Un bijou de newsletter, comme d'hab 👌
      </Quote>
    ),
    lauthieb: (
      <Quote
        url="https://twitter.com/lauthieb/status/1498725922127626250"
        handle="lauthieb"
        github="lauthieb"
        name="Laurent Thiebault"
        job="Engineering Manager - Decathlon"
      >
        Toujours aussi riche cette newsletter 💌
      </Quote>
    ),
    lereacteurIO: (
      <Quote
        url="https://www.linkedin.com/feed/update/urn:li:activity:6856274186218876928/"
        handle="lereacteurIO"
        github="lereacteur"
        name="Xavier Colombel"
        job="CEO - Le Reacteur Coding Bootcamp"
        profileUrl="https://github.com/XavierColombel.png"
      >
        La meilleure newsletter qui traite de l'écosystème React
      </Quote>
    ),
    dbuchet: (
      <Quote
        url="https://www.linkedin.com/feed/update/urn:li:activity:6905211472721317888/"
        handle="hichtibidi"
        github="dbuchet"
        avatarUrl="https://github.com/dbuchet.png"
        name="Damien Buchet"
        job="Tech Lead - Wild Code School"
        profileUrl="https://www.linkedin.com/in/damienbuchet/"
      >
        Sa newsletter est juste parfaite
      </Quote>
    ),
    sylvainpauly: (
      <Quote
        url="https://www.linkedin.com/feed/update/urn:li:activity:6894694552519659523/"
        handle={null}
        github="sylvain-pauly"
        avatarUrl="https://github.com/sylvain-pauly.png"
        name="Sylvain Pauly"
        job="Senior Front-end Software Engineer - Yousign"
        profileUrl="https://www.linkedin.com/in/sylvainpauly/"
      >
        Du contenu en français de qualité !
      </Quote>
    ),
    pierver: (
      <Quote
        url="https://www.linkedin.com/feed/update/urn:li:activity:6899716385652514816/"
        handle={null}
        github={null}
        name="Pierre V."
        job="Master Tech Lead - frog France (CapGemini)"
        profileUrl="https://www.linkedin.com/in/pierver/"
      >
        Une newsletter hebdomadaire indispensable
      </Quote>
    ),
    alexsoyes: (
      <Quote
        url="https://twitter.com/alexsoyes/status/1531289336922001408"
        handle="alexsoyes"
        github="alexsoyes"
        name="Alexandre Soyer"
        job="Freelance - Bloggeur sur alexsoyes.com"
      >
        Une mine d'or en termes de curation
      </Quote>
    ),
    arkerone: (
      <Quote
        url="https://twitter.com/arkerone/status/1528776694567473152"
        handle="arkerone"
        github="arkerone"
        name="Axel Shaita"
        job="Tech lead - Bloggeur sur codeheroes.fr"
      >
        Vous ne trouverez pas mieux pour faire votre veille
      </Quote>
    ),
    Console_buche: (
      <Quote
        url="https://twitter.com/Console_buche/status/1488598916396421124"
        handle="Console_buche"
        github="Console-buche"
        name="Sebastien Dubourg"
        job="Développeur Frontend - TenableSecurity"
      >
        Ces newsletter sont vraiment super
      </Quote>
    ),
    elenabattisti: (
      <Quote
        url="https://www.linkedin.com/feed/update/urn:li:activity:6899717336786354176/"
        handle={null}
        github="ElenabMA"
        name="Elena Battisti"
        job="Développeuse Web Front-End - Meilleurs Agents "
        profileUrl="https://www.linkedin.com/in/elenabattisti/"
      >
        Un outil de veille très précieux
      </Quote>
    ),
    LeMathisBarre: (
      <Quote
        url="https://twitter.com/LeMathisBarre/status/1472198211204890624"
        handle="TheMathisBarre"
        github="MathisBarre"
        name="Mathis Barré"
        job="Développeur React et React Native - Beapp"
      >
        Je n'ai jamais trouvé mieux
      </Quote>
    ),
    _smontlouis: (
      <Quote
        url="https://twitter.com/_smontlouis/status/1524429506190221313"
        handle="_smontlouis"
        github="smontlouis"
        name="Stéphane Montlouis"
        job="Lead front-end developer - EMCITV"
      >
        100% de mes news react viennent de chez toi
      </Quote>
    ),
  },
};

export default function HomepageQuotes() {
  const { i18n } = useDocusaurusContext();
  const isFrench = i18n.currentLocale === "fr";
  return (
    <section className={clsx("container", styles.quotesContainer)}>
      {AllQuotes.en.theo}
      {AllQuotes.en.jackherrington}
      {AllQuotes.en.tkdodo}
      {AllQuotes.en.evanbacon}
      {AllQuotes.en.wcandillon}
      {AllQuotes.en.addyosmani}

      {isFrench && (
        <>
          {AllQuotes.fr.xavier_seignard}
          {AllQuotes.fr.lauthieb}
          {AllQuotes.fr.lereacteurIO}
          {AllQuotes.fr.dbuchet}
          {AllQuotes.fr.alexsoyes}
          {AllQuotes.fr.arkerone}
          {AllQuotes.fr.Console_buche}
          {AllQuotes.fr.elenabattisti}
          {AllQuotes.fr.sylvainpauly}
          {AllQuotes.fr.pierver}
          {AllQuotes.fr.LeMathisBarre}
          {AllQuotes.fr._smontlouis}
        </>
      )}
      {AllQuotes.en.kzzzf}
      {AllQuotes.en.grabbou}
      {AllQuotes.en.threepointone}
      {AllQuotes.en.sebmarkbage}
      {AllQuotes.en.yangshunz}
      {AllQuotes.en.dmitry}
      {AllQuotes.en.michal}
      {AllQuotes.en.kentcdodds}
      {AllQuotes.en.NoriSte}
      {AllQuotes.en.simongrimm}
      {AllQuotes.en.ericclemmons}
      {AllQuotes.en.swmansion}
      {AllQuotes.en.Jonsamp}
      {AllQuotes.en.amanhimself}
      {AllQuotes.en.johnnyreilly}
      {AllQuotes.en.mcavaliere}
      {AllQuotes.en.ane_naiz}
      {AllQuotes.en.elijahmanor}
      {AllQuotes.en.asidorenko_}
      {AllQuotes.en.beaussan}
      {AllQuotes.en.peterpme}
      {AllQuotes.en.wbroek}
      {AllQuotes.en.fredmaiaarantes}
      {AllQuotes.en.ndubien}
      {AllQuotes.en.jamonholmgren}
      {AllQuotes.en.frankdilo}
      {AllQuotes.en.ElaziziYoussouf}
      {AllQuotes.en.__marcin_}
      {AllQuotes.en.Danny_H_W}
      {AllQuotes.en.Thierryskoda}
      {AllQuotes.en.dev_bogdan}
    </section>
  );
}

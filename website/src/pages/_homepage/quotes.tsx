import React, { ComponentProps } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import clsx from "clsx";
import TweetQuote from "@site/src/components/TweetQuote";

import styles from "./quotes.module.css";

function Quote(props: ComponentProps<typeof TweetQuote>) {
  return (
    <div className={styles.quoteContainer}>
      <TweetQuote {...props} />
    </div>
  );
}

export default function HomepageQuotes() {
  const { i18n } = useDocusaurusContext();
  const isFrench = i18n.currentLocale === "fr";
  return (
    <section className={clsx("container", styles.quotesContainer)}>
      <Quote
        url="https://twitter.com/wcandillon/status/1263825118557593600"
        handle="wcandillon"
        name="William Candillon"
        job="React-Native animations expert - Youtuber"
      >
        If you are not signed-up to @sebastienlorber mailing-list, you are
        missing out 🙌🏻
      </Quote>
      <Quote
        url="https://twitter.com/threepointone/status/1493894062293794817"
        handle="threepointone"
        name="Sunil Pai"
        job="Engineer at Cloudflare - ex React core team"
      >
        The one React newsletter/source of "what's new" that I follow
      </Quote>
      <Quote
        url="https://twitter.com/kentcdodds/status/1389240652324474880"
        handle="kentcdodds"
        name="Kent C. Dodds"
        job="Developer Experience at Remix - React expert"
      >
        These threads you do are awesome
      </Quote>
      <Quote
        url="https://twitter.com/sebmarkbage/status/1557365971182145543"
        handle="sebmarkbage"
        name="Sebastian Markbåge"
        job="Engineer at Vercel - ex React core team"
      >
        Feels like such an institution that has always been there and will
        always be there
      </Quote>
      <Quote
        url="https://twitter.com/yangshunz/status/1511641180907323393"
        handle="yangshunz"
        name="Yangshun Tay"
        job="Staff Front End Engineer at Meta"
      >
        Really useful for me as someone who doesn't use Twitter that often
      </Quote>
      <Quote
        url="https://twitter.com/NoriSte/status/1448145180461355008"
        handle="NoriSte"
        name="Stefano Magni"
        job="Senior Front-end Engineer at Hasura"
      >
        It's like reading a summary instead of scanning Twitter for every
        React-related valuable news
      </Quote>
      <Quote
        url="https://twitter.com/ericclemmons/status/1519304291609198592"
        handle="ericclemmons"
        name="Eric Clemmons"
        job="Staff Engineer at Stripe"
      >
        The closest thing we have to Oscars is @sebastienlorber ’s weekly
        roundup
      </Quote>
      <Quote
        url="https://twitter.com/swmansion/status/1496225215730397187"
        handle="swmansion"
        name="Software Mansion"
        job="React-Native & Expo experts"
      >
        A high-quality newsletter with all the most important news from the
        React world
      </Quote>
      <Quote
        url="https://twitter.com/Jonsamp/status/1471222654338314240"
        handle="Jonsamp"
        name="Jon Samp"
        job="Software Developer at Expo"
      >
        Such a great source of React/tech news. This newsletter might just
        replace Twitter for me 😂
      </Quote>
      <Quote
        url="https://twitter.com/amanhimself/status/1450753646082150401"
        handle="amanhimself"
        name="Aman Mittal"
        job="Developer & Tech Writer"
      >
        My goto gateway for what’s happening in React World
      </Quote>

      {isFrench && (
        <>
          <Quote
            url="https://twitter.com/xavier_seignard/status/1511793034979168261"
            handle="xavier_seignard"
            name="Xavier Seignard"
            job="Senior Software Engineer chez Alan"
          >
            Un bijou de newsletter, comme d'hab 👌
          </Quote>
          <Quote
            url="https://twitter.com/lauthieb/status/1498725922127626250"
            handle="lauthieb"
            name="Laurent Thiebault"
            job="Engineering Manager chez Decathlon"
          >
            Toujours aussi riche cette newsletter 💌
          </Quote>
          <Quote
            url="https://twitter.com/alexsoyes/status/1531289336922001408"
            handle="alexsoyes"
            name="Alexandre Soyer"
            job="Freelance - Bloggeur sur alexsoyes.com"
          >
            Une mine d'or en termes de curation
          </Quote>
          <Quote
            url="https://twitter.com/arkerone/status/1528776694567473152"
            handle="arkerone"
            name="Axel Shaita"
            job="Tech lead - Bloggeur sur codeheroes.fr"
          >
            Vous ne trouverez pas mieux pour faire votre veille
          </Quote>
          <Quote
            url="https://twitter.com/Console_buche/status/1488598916396421124"
            handle="Console_buche"
            name="Sebastien - console_buche"
            job="Développeur chez Frontend TenableSecurity"
          >
            Ces newsletter sont vraiment super
          </Quote>
          <Quote
            url="https://twitter.com/__martin_gs__/status/1460664479503499275"
            handle="__martin_gs__"
            name="Martin GS"
            job="Développeur Front-End"
          >
            Une des meilleures newsletter
          </Quote>
          <Quote
            url="https://twitter.com/LeMathisBarre/status/1472198211204890624"
            handle="LeMathisBarre"
            name="Mathis Barré"
            job="Développeur React et React Native"
          >
            Je n'ai jamais trouvé mieux
          </Quote>
          <Quote
            url="https://twitter.com/_smontlouis/status/1524429506190221313"
            handle="_smontlouis"
            name="Stéphane Montlouis"
            job="Lead front-end developer chez EMCITV"
          >
            100% de mes news react viennent de chez toi
          </Quote>
        </>
      )}

      <Quote
        url="https://twitter.com/beaussan/status/1488578333851930627"
        handle="beaussan"
        name="Nicolas Beaussart"
        job="Engineer at Hasura"
      >
        Your threads and newletter are a gem !
      </Quote>
      <Quote
        url="https://twitter.com/fredmaiaarantes/status/1545399680783323136"
        handle="fredmaiaarantes"
        name="Fred Maia Arantes"
        job="CEO at MeteorJS"
      >
        If you are into React, you should subscribe to the @sebastienlorber
        newsletter!
      </Quote>
      <Quote
        url="https://twitter.com/ane_naiz/status/1442606436207497216"
        handle="ane_naiz"
        name="Ane Diaz"
        job="Software Engineer at Datadog"
      >
        I won't miss any information from now on 😊😎
      </Quote>
      <Quote
        url="https://twitter.com/johnny_reilly/status/1477359594087321600"
        handle="johnny_reilly"
        name="John Reilly"
        job="Group Principal Engineer at Investec"
      >
        Sebastien helps us learn the things we need to learn
      </Quote>
      <Quote
        url="https://twitter.com/mcavaliere/status/1371512182178000897"
        handle="mcavaliere"
        name="Mike Cavaliere"
        job="Senior Engineering Strategist at Echobind"
      >
        I can see important React news at a glance.
      </Quote>
      <Quote
        url="https://twitter.com/elijahmanor/status/1529154947081809921"
        handle="elijahmanor"
        name="Elijah Manor"
        job="Senior Software Engineer at Planview"
      >
        React reminder, consider following this newsletter if you do not
        already. JAM packed with news goodies
      </Quote>
      <Quote
        url="https://twitter.com/asidorenko_/status/1479029650496102402"
        handle="asidorenko_"
        name="Alex Sidorenko"
        job="Senior Software Engineer - Blogger"
      >
        This is probably the best resource out there if you want to stay up to
        date with React community news
      </Quote>
      <Quote
        url="https://twitter.com/appfactory/status/1346400236034523139"
        handle="appfactory"
        name="Peter Cilliers-Pistorius"
        job="RedwoodJS & Snaplet Co-creator"
      >
        Hello internet, this is your daily dose of development.
      </Quote>
      <Quote
        url="https://twitter.com/frankdilo/status/1391828520922279936"
        handle="frankdilo"
        name="Francesco Di Lorenzo"
        job="Co-founder of Mailbrew & Typefully"
      >
        @sebastienlorber is a great follow. These weekly recap threads are a
        great format.
      </Quote>
      <Quote
        url="https://twitter.com/ElaziziYoussouf/status/1338448625677066240"
        handle="ElaziziYoussouf"
        name="Youssouf El Azizi"
        job="Senior Front-end Engineer at Hasura"
      >
        Always enjoy reading @sebastienlorber newsletter 👌
      </Quote>
      <Quote
        url="https://twitter.com/Danny_H_W/status/1468285893203144713"
        handle="Danny_H_W"
        name="Daniel Williams"
        job="Senior Frontend developer at Coverflex"
      >
        Your weekly newsletter is my favourite source of tech news
      </Quote>
      <Quote
        url="https://twitter.com/Thierryskoda/status/1440272076800094211"
        handle="Thierryskoda"
        name="Thierry Skoda"
        job="Developer at Hack House Web3"
      >
        I feel that I never miss out on anything.
      </Quote>
    </section>
  );
}

import React from 'react'
// import Header from 'app/components/elements/LandingHeader'
import CountDowns from 'app/components/elements/LandingCountDowns'
import Distribution from 'app/components/elements/LandingDistribution'
import WhatIsGolos from 'app/components/elements/LandingWhatIsGolos'
import JoinUs from 'app/components/elements/LandingJoinUs'
import Documentation from 'app/components/elements/LandingDocumentation'
import WhoWeAre from 'app/components/elements/LandingWhoWeAre'
import BlockchainRevolution from 'app/components/elements/LandingBlockchainRevolution'
import Faq from 'app/components/elements/LandingFaq'
import WhyGolos from 'app/components/elements/LandingWhyGolos'
import Team from 'app/components/elements/LandingTeam'
import Press from 'app/components/elements/LandingPress'
import Partners from 'app/components/elements/LandingPartners'
import Footer from 'app/components/elements/LandingFooter'
import Header from 'app/components/elements/LandingHeader'
let WOW
if (process.env.BROWSER) WOW = require('wowjs/dist/wow.js')

/*
    NOTE there was so little time and so much todo, thats why code is clumsy and
    there is little to no comments
	TODO add comments
*/

// format date properly
function createDate(year, month, day, hours, minutes) {
	//const today = new Date()
	//const mins = (minutes == 0 || !minutes) ? 0 : today.getMinutes()
	const date = new Date(Date.UTC(year, month, day, hours || 0, minutes || 0, 0));
  console.log(date)
	return date
}

const buyGolosButton = <a href="" className="button Landing__button_big">Купи <strong>Силу Голоса</strong></a>

const blockchainStartAt = createDate(2016, 9, 18, 11, 0)
const crowdsaleStartAt = createDate(2016, 10, 1, 11, 0)
const crowdsaleEndAt = createDate(2016, 11, 1, 11, 0)

class Landing extends React.Component {

	componentDidMount() { if (process.env.BROWSER && WOW) new WOW().init() }

    render() {
		// TODO move this constant into <CountDowns />
		const prefill = crowdsaleStartAt > Date.now()
        return (
            <div className="Landing text-center">
				<CountDowns
					prefill={prefill}
					crowdsaleStartAt={crowdsaleStartAt}
					blockchainStartAt={blockchainStartAt}
					crowdsaleEndAt={crowdsaleEndAt}
					button={buyGolosButton}
				/>
				<WhatIsGolos />
				<WhyGolos />
				<JoinUs />
				<BlockchainRevolution />
				<Documentation />
				<Faq />
				<Distribution />
				<WhoWeAre />
				<Team />
				<Partners />
				<Press button={buyGolosButton} />
				<Footer />
            </div>
        )
    }
}

module.exports = {
    path: 'ico',
    component: Landing
};

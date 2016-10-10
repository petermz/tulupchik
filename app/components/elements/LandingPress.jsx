import React from 'react'


export default class LandingPress extends React.Component {
	render() {
		const data = [
			// TODO http://forklog.com/russkoyazychnyj-analog-steemit-obyavil-o-nachale-kraudsejla/
			{
				url: 'http://forklog.com/russkoyazychnyj-analog-steemit-obyavil-o-nachale-kraudsejla/',
				title: 'Русскоязычный аналог Steemit анонсировал краудсейл',
				image: 'http://forklog.com/wp-content/themes/newForklog/img/logo.svg',
				text: '29 сентября была сделана копия учетных записей блокчейна социальной сети Steemit в рамках договоренности о создании русскоязычной версии соцсети, получившей название “Голос”. 60% токенов сети будет распределено в рамках ICO, которое стартует 15 октября.'
			},
			{
				url: 'http://www.coinfox.ru/novosti/6457-kiber-fond-sozdast-russkoyazychnuyu-sotsset-na-blokchejne-steem',
				title: 'Кибер•Фонд создаст русскоязычную соцсеть на блокчейне Steem',
				image: 'http://www.coinfox.ru/images/news/Golos.png',
				text: 'COINFOX: Разработчики не удовлетворены развитием русскоязычного сообщества в существующей соцсети Steemit и надеются, что новая сеть «Голос» с собственными токенами даст толчок к его развитию.'
			},
			{
				url: 'https://www.cryptocoinsnews.com/new-blockchain-social-media-platform-speaks-with-a-russian-voice/',
				title: 'New Blockchain Social Media Platform Speaks with a Russian \'Voice\'',
				image: 'https://www.cryptocoinsnews.com/wp-content/uploads/2016/01/Russian-flag-in-silk-768x506.jpg',
				text: 'CRYPTOCOINSNEWS: With cyber.Fund using Steemit as a template, Voice is intended to cater to the uniqueness of the Russian people, as contributions to the Steemit website are primarily in English, although there are posts in a few other languages.'
			},
			{
				url: 'http://www.econotimes.com/CyberFund-launches-first-blockchain-based-Russian-social-network-Voice-332085',
				title: 'Cyber.Fund launches first blockchain-based Russian social network - Voice',
				image: 'http://www.econotimes.com/assets/images/econotimes/metaDefault.png',
				text: 'ECONOTIMES: Cyber.Fund, an investment platform for blockchain assets, has announced the launch of first Russian-language social network –Voice, based on blockchain technology that will be an analogue of Steemit international network.'
			}

		]

		return (
			<section className="Press">
				<div className="row">
					<div className="small-12 columns">
						<h2 className="Press__header Landing__h2_blue">Пресса</h2>
					</div>
				</div>
				{
					data.map((article, index) => {
						return 	<div key={index} className="row text-left Press__article">
									<div className="small-2 medium-2 large-2 columns">
										<img src={article.image} />
									</div>
									<div className="small-10 medium-10 large-10 columns">
										<a href={article.url}>
											<strong>{article.title}</strong>
											<p>{article.text}</p>
										</a>
									</div>
								</div>
					})
				}
				{/* Костя сказал убрать логотипы и вставить ссылки на статьи */}
				{/* <div className="row Press__logos">
					<div className="small-4 medium-3 large-2">
						<img src="https://cyber.fund/images/cybF.svg" alt="логотип cyber.fund" />
					</div>
					<div className="small-4 medium-3 large-2">
						<img src="images/landing/steem.png" alt="логотип steem" />
					</div>
				</div> */}
				{/* Дима сказал убрать кнопку */}
				{/*
				<div className="row Press__action">
					<div className="small-12 columns">
						{this.props.button}
						<p className="Press__action__p">Продажа Голоса закончиться при достижении 3300 ฿</p>
					</div>
				</div>
				*/}
				<hr />
			</section>
		)
	}
}

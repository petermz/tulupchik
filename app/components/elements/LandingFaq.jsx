import React from 'react'
import {Accordion, AccordionItem} from 'react-foundation-components/lib/global/accordion';

export default class LandingFaq extends React.Component {
	render() {
		return (
			<section>
				<div className="row text-center">
					<div className="small-12 columns">
						<h2 className="Landing__h2_blue">Вопросы - ответы</h2>
						<span className="">Узнайте больше о Голосе</span>
					</div>
				</div>
				<div className="row">
					<div className="small-12 columns">
						<strong>Чем Голос отличается от других платформ?</strong>
						<p>Обычно криптовалютные платформы требуют от пользователей что то предпринять для того, чтобы вознаградить других за их вклад. У Голос вознаграждение других осуществляется путем голосования за публикацию также просто как это вы сделали бы это например в социальных сетях Facebook или ВКонтакте.</p>
					</div>
				</div>
				<div className="row">
					<div className="small-12 columns">
						<strong>Как оплачивается создание контента и кураторство?</strong>
						<p>Блокчейн распределяет выплаты в следующей пропорции: 50% добавляется в Силу Голоса для голосования и 50% Золотых. Вознаграждения распределяются в блокчейне подобно тому, как майнерам выплачивается награда в Bitcoin, и происходит примерно через 24 часа после размещения публикации и подачи голосов.</p>
					</div>
				</div>
				<div className="row">
					<div className="small-12 columns">
						<Accordion defaultActiveKey="Vagina">
							<Accordion title="Vagina">Penis</Accordion>
							<Accordion title="Penis">Vagina</Accordion>
						</Accordion>
					</div>
				</div>
				<div className="row">
					<div className="small-12 columns">
						<span>Остались вопросы, наше комьюнити поможет Вам найти ответы</span>
						<button className="button">Задать вопрос</button>
					</div>
				</div>
				<hr />
			</section>
		)
	}
}
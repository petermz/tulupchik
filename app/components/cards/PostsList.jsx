import React, {PropTypes} from 'react';
import PostSummary from 'app/components/cards/PostSummary';
import Post from 'app/components/pages/Post';
import LoadingIndicator from 'app/components/elements/LoadingIndicator';
import shouldComponentUpdate from 'app/utils/shouldComponentUpdate';
import debounce from 'lodash.debounce';
import Callout from 'app/components/elements/Callout';
import CloseButton from 'react-foundation-components/lib/global/close-button';

function topPosition(domElt) {
    if (!domElt) {
        return 0;
    }
    return domElt.offsetTop + topPosition(domElt.offsetParent);
}

class PostsList extends React.Component {

    static propTypes = {
        posts: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired,
        category: PropTypes.string,
        loadMore: PropTypes.func,
        emptyText: PropTypes.string,
        showSpam: PropTypes.bool,
        global: React.PropTypes.object.isRequired,
    };

    static defaultProps = {
        showSpam: false,
    }

    constructor() {
        super();
        this.state = {
            thumbSize: 'desktop',
            showNegativeComments: false,
            showPost: null
        }
        this.scrollListener = this.scrollListener.bind(this);
        this.onPostClick = this.onPostClick.bind(this);
        this.onBackButton = this.onBackButton.bind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'PostsList')
    }

    componentDidMount() {
        this.attachScrollListener();
    }

    componentWillUnmount() {
        this.detachScrollListener();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.showPost) {
            document.getElementsByTagName('body')[0].className = 'with-post-overlay';
            window.addEventListener('popstate', this.onBackButton);
        } else if (prevState.showPost) {
            window.history.pushState({}, '', this.original_url);
        }
        if (!this.state.showPost) {
            document.getElementsByTagName('body')[0].className = '';
        }
    }

    onBackButton() {
        window.removeEventListener('popstate', this.onBackButton);
        this.setState({showPost: null});
    }

    fetchIfNeeded() {
        this.scrollListener();
    }

    toggleNegativeReplies = () => {
        this.setState({
            showNegativeComments: !this.state.showNegativeComments
        });
    }

    scrollListener = debounce(() => {
        const el = window.document.getElementById('posts_list');
        if (!el) return;
        const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset :
            (document.documentElement || document.body.parentNode || document.body).scrollTop;
        if (topPosition(el) + el.offsetHeight - scrollTop - window.innerHeight < 10) {
            const {loadMore, posts, category} = this.props;
            if (loadMore && posts && posts.length > 0) loadMore(posts[posts.length - 1], category);
        }

        // Detect if we're in mobile mode (renders larger preview imgs)
        var mq = window.matchMedia('screen and (max-width: 39.9375em)');
        if(mq.matches) {
            this.setState({thumbSize: 'mobile'})
        } else {
            this.setState({thumbSize: 'desktop'})
        }
    }, 150)

    attachScrollListener() {
        window.addEventListener('scroll', this.scrollListener);
        window.addEventListener('resize', this.scrollListener);
        this.scrollListener();
    }

    detachScrollListener() {
        window.removeEventListener('scroll', this.scrollListener);
        window.removeEventListener('resize', this.scrollListener);
    }

    onPostClick(post, url) {
        this.original_url = window.location.pathname;
        window.history.pushState({}, '', url);
        this.setState({showPost: post});
    }

    render() {
        const {posts, loading, category, emptyText, global} = this.props;
        const {comments} = this.props
        const {thumbSize, showPost} = this.state
        if (!loading && !posts.length && emptyText) {
            return <Callout body={emptyText} type="success" />;
        }
        const renderSummary = items => items.map(({item, ignore, netVoteSign, authorRepLog10}) => <li key={item}>
            <PostSummary post={item} currentCategory={category} thumbSize={thumbSize}
                ignore={ignore} netVoteSign={netVoteSign} authorRepLog10={authorRepLog10} onClick={this.onPostClick} />
        </li>)
        return (
            <div id="posts_list" className="PostsList">
                <ul className="PostsList__summaries hfeed" itemScope itemType="http://schema.org/blogPosts">
                    {renderSummary(comments)}
                </ul>
                {loading && <center><LoadingIndicator type="circle" /></center>}
                {showPost && <div className="PostsList__post_overlay">
                    <CloseButton onClick={() => {this.setState({showPost: null})}} />
                    <div className="PostsList__post_container">
                        <Post post={showPost} />
                    </div>
                </div>}
            </div>
        );
    }
}

import {List} from 'immutable'
import {connect} from 'react-redux'

export default connect(
    (state, props) => {
        const {posts, showSpam} = props;
        const comments = []
        posts.forEach(item => {
            const content = state.global.get('content').get(item);
            if(!content) {
                console.error('PostsList --> Missing content key', content)
                return
            }
            if(props.category === "posts" && content.get('depth') === 0) {
                // do not include root posts in comments tab
                return
            }
            // let total_payout = 0;
            const current = state.user.get('current')
            const username = current ? current.get('username') : null
            const key = ['follow', 'get_following', username, 'result', content.get('author')]
            const ignore = username ? state.global.getIn(key, List()).contains('ignore') : false
            const {hide, netVoteSign, authorRepLog10} = content.get('stats').toJS()
            if(!(ignore || hide) || showSpam) // rephide
                comments.push({item, ignore, netVoteSign, authorRepLog10})
        })
        return {...props, comments, global: state.global};
    },
)(PostsList)

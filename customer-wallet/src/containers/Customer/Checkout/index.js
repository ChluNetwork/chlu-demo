import React, { Component } from 'react'
import PropTypes from 'prop-types'
// redux
import { connect } from 'react-redux'
import { actions } from 'shared-libraries/lib'
// components
import RaisedButton from 'material-ui/RaisedButton'
import PaySection from './sections/PaySection'
import ProductSection from './sections/ProductSection'
import CircularProgress from 'material-ui/CircularProgress'
// styles
import './styles.css'
// constants
import { orange, lightBorderOrange, lightOrange, mainTextColor } from 'context/palette'

const { dataActions: { checkout: { getCheckout } } } = actions

const buttonStyles = {
  style: { border: `1px solid ${lightBorderOrange}` },
  buttonStyle: { background: `linear-gradient(to bottom, ${lightOrange}, ${orange})` },
  labelStyle: {
    textTransform: 'none',
    fontWeight: 'bold',
    color: mainTextColor,
  }
}


class Checkout extends Component {
  componentDidMount() {
    const { getCheckout } = this.props

    getCheckout()
  }

  render() {
    const { checkout: {
      loading,
      data: { rating, avatar, price, product }
    } } = this.props

    return (
      <div className='page-container checkout color-main'>
        <div className='container'>
          {
            loading
              ? <CircularProgress />
              : <div className='checkout-vendor'>
                  <ProductSection product={product} price={price} avatar={avatar} rating={rating} />
                  <div className='payment-label'>Payment Method</div>
                  <PaySection />
                  <div className='checkout-vendor__button'>
                    <RaisedButton
                      label='Continue'
                      fullWidth={true}
                      {...buttonStyles}
                      onClick={() => null}
                    />
                  </div>
              </div>
          }
        </div>
      </div>
    )
  }
}

Checkout.propTypes = {
  checkout: PropTypes.object.isRequired,
  getCheckout: PropTypes.func.isRequired
}

const maoStateToProps = store => ({
  checkout: store.data.checkout
})

const mapDispatchToProps = {
  getCheckout
}

export default connect(maoStateToProps, mapDispatchToProps)(Checkout)
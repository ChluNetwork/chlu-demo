import React, { Component } from 'react'
import PropTypes from 'prop-types'
// redux
import { connect } from 'react-redux'
import { setRatingForCustomerWallet } from 'store/modules/components/CustomerWallet'
import { actions } from 'shared-libraries/lib'
import { formValueSelector } from 'redux-form'
import { setFxRates } from 'lib/fxRates'
// libs
import { toastr } from 'react-redux-toastr'
// components
import CustomerWalletForm from './CustomerWalletForm'
// assets
import { buttonsData } from '../assets/data'
// constants
const { dataActions: {
  payment: { submitPayment }
} } = actions

class CustomerWalletFormWrapper extends Component {

  static propTypes = {
    submitPayment: PropTypes.func.isRequired,
    isReviewOpen: PropTypes.bool,
    loading: PropTypes.bool,
    rating: PropTypes.number.isRequired,
    setRating: PropTypes.func.isRequired,
    rates: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    getRates: PropTypes.func.isRequired
  }

  handleSubmit = (data) => {
    const { submitPayment } = this.props
    const { rating } = this.props

    submitPayment({ ...data, rating })
      .then((response) => {
        console.log(response)
        toastr.success('success', 'Payment success')
      })
  }

  onStarClick = rating => {
    const { setRating } = this.props

    setRating(rating)
  }

  render () {
    const { isReviewOpen, loading, rating, toggleModal, priceBtc } = this.props
    return (
      <CustomerWalletForm
        onSubmit={this.handleSubmit}
        onStarClick={this.onStarClick}
        ratingValue={rating}
        isReviewOpen={isReviewOpen}
        loading={loading}
        buttonsData={buttonsData}
        toggleModal={toggleModal}
        priceBtc={priceBtc}
      />
    )
  }
}

const selector = formValueSelector('customer-wallet-form')

const mapStateToProps = state => ({
  isReviewOpen: selector(state, 'reviewOpen'),
  loading: state.data.payment.loading,
  rating: state.components.customerWallet.rating,
  rates: state.data.fxRates.rates
})

const mapDispatchToProps = dispatch => ({
  submitPayment: data => dispatch(submitPayment(data)),
  setRating: data => dispatch(setRatingForCustomerWallet(data)),
  getRates: () => dispatch(getRates())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerWalletFormWrapper)

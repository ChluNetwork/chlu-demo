import React, { Component } from 'react'
import { object } from 'prop-types'
// redux
import { connect } from 'react-redux'
import { signIn } from 'store/modules/ui/profile'
// libs
import { importWallet } from 'helpers/wallet'
import { Link } from 'react-router-dom'
// components
import FileReaderInput from 'react-file-reader-input'
import WalletCard from '../Card'
import Button from '@material-ui/core/Button'
import { toastr } from 'react-redux-toastr'
import { CardActions, CardHeader, Avatar, Divider, CardContent } from '@material-ui/core';
// icons
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'

class ImportWallet extends Component {
  static propTypes = {
    wallet: object
  }

  async importWallet(str) {
    try {
      const wallet = importWallet(str)
      await this.props.signIn(wallet)
      toastr.success('Wallet imported', 'Your existing data has been imported')
      // TODO: redirect user depending on their type: business goes to reviews about me, individual goes to search
    } catch (error) {
      toastr.error('Could not import Wallet', 'Something went wrong')
      console.log(error)
    }
  }

  fileChanged(event, results) {
    if (results.length > 0) {
      // docs: https://github.com/ngokevin/react-file-reader-input#usage
      this.importWallet(results[0][0].target.result)
    }
  }

  render () {
    const { loading } = this.props

    if (loading) {
      return <div>
        <WalletCard>
          <CardHeader
            avatar={<Avatar><WalletIcon/></Avatar>}
            title='Signing In...'
            subheader='Please wait while your Wallet is imported'
          />
        </WalletCard>
      </div>
    } else {
      return (
        <div>
          <WalletCard>
            <CardHeader
              avatar={<Avatar><WalletIcon/></Avatar>}
              title='Import a Chlu Wallet'
              subheader='Access your existing funds and Identity from this device'
            />
            <CardContent>
              Don't have a wallet yet? <Link to='/'>Create a new one</Link>
            </CardContent>
            <CardActions>
              <FileReaderInput
                as='text'
                onChange={this.fileChanged.bind(this)}
                accept='application/json'
              >
                <Button variant='raised' color='primary'>
                  Import from File
                </Button>
              </FileReaderInput>
            </CardActions>
            <Divider/>
          </WalletCard>
        </div>
      )
    }
  }
}

const mapStateToProps = store => ({
  wallet: store.data.wallet,
  loading: store.ui.profile.loginLoading
})

const mapDispatchToProps = {
  signIn
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportWallet)

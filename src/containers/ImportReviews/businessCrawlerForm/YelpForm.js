import React from 'react'
import { Grid } from '@material-ui/core'
import CustomInput from 'components/Form/CustomInput'
import { Field } from 'redux-form'
import { InputAdornment, withStyles } from '@material-ui/core'

import FaceIcon from '@material-ui/icons/Face';
import EmailIcon from '@material-ui/icons/Email';
import HttpsIcon from '@material-ui/icons/Https';

const style = {
  gridRow: {
    margin: '12px 0',
  }
}

class YelpForm extends React.Component {

  render() {
    const { classes } = this.props

    return (
      <Grid item xs={12} md={12} >
        <Grid container justify='center'>
          <Grid item xs={12} md={8} className={classes.gridRow}>
            <h5>Import Yelp reviews <small>(coming soon)</small></h5>

            <Field
              component={CustomInput}
              labelText='Yelp profile URL'
              name='yelp-url'
              formControlProps={{ fullWidth: true }}
              inputProps={{
                disabled: true,
                endAdornment: (
                  <InputAdornment position='end' className={classes.inputAdornment}>
                    <FaceIcon className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>

        <Grid container justify='center'>
          {this.renderLogin()}
        </Grid>
      </Grid>
    )
  }

  renderLogin() {
    const { classes } = this.props

    return (
      <Grid item xs={12} md={8} className={classes.gridRow}>
        <Grid container justify='space-between' spacing={8} style={{ marginTop: -24 }}>
          <Grid item xs={12} md={6} className={classes.gridRow}>
            <Field
              component={CustomInput}
              labelText='Yelp e-mail'
              name='yelp-email'
              formControlProps={{ fullWidth: true }}
              inputProps={{
                disabled: true,
                endAdornment: (
                  <InputAdornment position='end' className={classes.inputAdornment}>
                    <EmailIcon className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.gridRow}>
            <Field
              component={CustomInput}
              labelText='Yelp password'
              name='yelp-password'
              formControlProps={{ fullWidth: true }}
              inputProps={{
                disabled: true,
                type: 'password',
                endAdornment: (
                  <InputAdornment position='end' className={classes.inputAdornment}>
                    <HttpsIcon className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    )
  }

  /**
   * @param {string} url
   */
  isYelpProfileUrlValid(url) {
    if (!url) return false;

    url = url.toLowerCase();

    if (url.indexOf('yelp.com') === 0) return true;
    if (url.indexOf('www.yelp.com') === 0) return true;
    if (url.indexOf('http://yelp.com') === 0) return true;
    if (url.indexOf('https://yelp.com') === 0) return true;
    if (url.indexOf('http://www.yelp.com') === 0) return true;
    if (url.indexOf('https://www.yelp.com') === 0) return true;

    return false;
  }
}

export default withStyles(style)(YelpForm)

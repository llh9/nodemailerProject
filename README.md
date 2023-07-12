Nodemailer is a Node.js module that allows you to send emails from your server with ease. Whether you want to communicate with your users or just notify yourself when something has gone wrong, one of the options for doing so is through mail.

There are many articles out there explaining how to use Nodemailer in barebones form, but this article is not one of them. Here, I will show the most common practice of sending an email from your Node.js backend using Nodemailer and Gmail.
How to Get Started with Nodemailer

First, we need to set up our Node.js boilerplate using Express. To make sure you have Node and npm installed, you can run the following commands:

node -v 
npm -v

If both of these commands show a version, you are good to go. Otherwise, install what is missing.

Create a directory for your project. We’ll use nodemailerProject.

mkdir nodemailerProject

Go inside the newly created directory and run

npm init

This will initialize our project with a pacakge.json file.

Next, we will need to install Express using:

npm install express

Depending which file you pointed to as your entry point (the default is index.js), open it and paste the following code:

const express = require('express')
const app = express()
const port = 3000


app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`)
})

index.js

Above is what is needed to start a simple server using Express. You can see that it is working properly by running:

node index.js

How to Install Nodemailer

Install nodemailer using the following command:

npm install nodemailer

Nodemailer’s API is pretty simple and requires us to do the following:

    Create a Transporter object
    Create a MailOptions Object
    Use the Transporter.sendMail method

To create a transporter object, we do the following:

let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
      }
    });

    ✋ Pay attention, as apart from the user and the pass keys, which are your own credentials for your gmail account, the other three keys need to be retrieved after setting up OAuth.

As we stated in the beginning of this article, we will be using Gmail for our mail sending needs. As you may have guessed, Gmail has a high level of security when it comes to mail sent by/to a user’s account.

There are a number of ways we can overcome this obstacle (some better than others), and we will choose the one that requires us to set up a project in the Google Cloud Platform. We need to do that in order to have credentials for the OAuth security enabled by Gmail.

    If you want to read more about the complexities of using Gmail with nodemailer, go here.

The next steps will require some configurations instead of coding, so brace yourselves.

Google Cloud Platform Configurations

If you don’t have a Google Cloud Platform account, be sure to set one up as a prerequisite. Once you have that set up, create a new project by clicking on the dropdown menu in the upper left corner.
1_a4fnFLNMoTtLJuqsKilVnA

Select the New Project option:
1_HNwUG3wPdbrwc3JB5D7_tg

In the next window, we will have to give our project a name. Pick whatever you like, but we will continue with out NodemailerProject name. For the location property, you can leave it as No organization.
1_TRlA6RBLCCCSMQ5R4di27A

It may take a few seconds to for the project to be set up, but after that you will be able to see this screen:
1_FT9MhBZyU4cZd4Qg6zeFag

Open up the navigation menu by clicking the three dashed lines in the top left corner and select APIs and Services:
1_qPaPpPadHQLdKCQbhjND7Q

In order to be able to use Nodemailer and Gmail we will have to use OAuth2. If you aren’t familiar with OAuth, it is a protocol for authentication. I won’t get into the specifics here as it is not necessary, but if you want to understand more about it, go here.

First we will have to configure our OAuth Consent Screen:
1_W2oeT1KmJXpwSQlIMIVo5w

If you are not a G-Suite member, the only option available will be External for User Type.
1_l_GrPVtXODPS0GXKLMdWYA

After clicking create, the next screen requires us to fill out the application’s information (our server):
1_reZ04hUX4jh1IzLGh7vCFA

Fill in your email in the User support email field and also in the Developer contact information field. Clicking Save and Continue will bring us to the Scopes phase of this configuration. Skip this phase, as it is not relevant for us, and head into the Test Users phase.
1_Jms50wZ5mVmUyOaiVF7b4w

Here, add yourself as a user and click Save and continue.
How to Configure Your OAuth Settings

In this phase will we create OAuth credentials to be used with Nodemailer. Head over to the Credentials tab above OAuth Consent Screen. Click on the plus (➕) sign that has the text Create Credentials and choose OAuth Client ID.
1_h0nME2ccR7HPjKmz_DMZRw

In the Application type dropdown menu, choose Web Application:
1_72Em-VS-fdM2WCwOA6zcfg

In the Authorized Redirect URIs section, make sure to add OAuth2 Playground (https://developers.google.com/oauthplayground) as we will use it to get one of the keys that was mentioned in the beginning of this article.
1_ywIcOlqA5DHdsPaSNnjJ9Q

After clicking create, you will be presented with your client id and client secret. Keep these to yourself and never expose them in any way, shape, or form.
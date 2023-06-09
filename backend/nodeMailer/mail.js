import nodeMailler from 'nodemailer'
import express from 'express';
import dotenv from 'dotenv';
import { isAuth } from '../utils';

const emailRouter = express.Router();
dotenv.config();

emailRouter.post("/placeorder", isAuth ,async (req, res)=>{
    try {
        const html = `
        <!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>A simple, clean, and responsive HTML invoice template</title>

		<style>
			.invoice-box {
				max-width: 800px;
				margin: auto;
				padding: 30px;
				border: 1px solid #eee;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
				font-size: 16px;
				line-height: 24px;
				font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
				color: #555;
			}

			.invoice-box table {
				width: 100%;
				line-height: inherit;
				text-align: left;
			}

			.invoice-box table td {
				padding: 5px;
				vertical-align: top;
			}

			.invoice-box table tr td:nth-child(2) {
				text-align: right;
			}

			.invoice-box table tr.top table td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.top table td.title {
				font-size: 45px;
				line-height: 45px;
				color: #333;
			}

			.invoice-box table tr.information table td {
				padding-bottom: 40px;
			}

			.invoice-box table tr.heading td {
				background: #eee;
				border-bottom: 1px solid #ddd;
				font-weight: bold;
			}

			.invoice-box table tr.details td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.item td {
				border-bottom: 1px solid #eee;
			}

			.invoice-box table tr.item.last td {
				border-bottom: none;
			}

			.invoice-box table tr.total td:nth-child(2) {
				border-top: 2px solid #eee;
				font-weight: bold;
			}

			@media only screen and (max-width: 600px) {
				.invoice-box table tr.top table td {
					width: 100%;
					display: block;
					text-align: center;
				}

				.invoice-box table tr.information table td {
					width: 100%;
					display: block;
					text-align: center;
				}
			}

			/** RTL **/
			.invoice-box.rtl {
				direction: rtl;
				font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
			}

			.invoice-box.rtl table {
				text-align: right;
			}

			.invoice-box.rtl table tr td:nth-child(2) {
				text-align: left;
			}
		</style>
	</head>

	<body>
		<div class="invoice-box">
			<table cellpadding="0" cellspacing="0">
				<tr class="top">
					<td colspan="2">
						<table>
							<tr>
								<td class="title">
									<img src="https://www.sparksuite.com/images/logo.png" style="width: 100%; max-width: 300px" />
								</td>

								<td>
									Order #: ${req.body.OrderID}<br />
									Created: ${new Date().toUTCString().slice(5, 16)} <br />
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="information">
					<td colspan="2">
						<table>
							<tr>
								<td>
									Sparksuite, Inc.<br />
									12345 Sunny Road<br />
									Sunnyville, CA 12345
								</td>

                                <td></td>
                                
                                <td></td>

								<td>
									${req.body.name}<br />
									${req.body.email}
									${req.body.number}
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="heading">
					<td>Payment Method</td>

                    <td></td>

                    <td></td>

					<td>Check #</td>
				</tr>

				<tr class="details">
					<td>${req.body.payment.paymentMethod}</td>
  
                    <td></td>

                    <td></td>

					<td>1000</td>
				</tr>

				<tr class="heading">
					<td>Item</td>

                    <td>Qty</td>

                    <td>Unit price</td>

					<td>Price</td>
				</tr>
                ${req.body.orderItems.map(
                    (items =>`
                    <tr class="item">
					<td>${items.name}</td>

                    <td>${items.qty}</td>

					<td>${items.price}</td>

                    <td>${items.price * items.qty}</td>
				</tr>`)
                )}
                <tr class="total">
                    <td></td>

                    <td></td>

                    <td>Shipping: N$ ${req.body.shippingPrice}</td>
                </tr>
                <tr class="total">
                    <td></td>

                    <td></td>

                    <td>Tax: N$ ${req.body.taxPrice}</td>
                </tr>
				<tr class="total">
                    <td></td>

                    <td></td>

					<td>Total: N$ ${req.body.totalPrice}</td>
				</tr>
			</table>
		</div>
	</body>
</html>
    `;  
        const transporter = nodeMailler.createTransport({
            service: 'hotmail',
            auth:{
                user: process.env.EMAIL_ACCOUNT,
                pass: process.env.EMAIL_PASSWORD
            },
        
    });
	console.log(req.body)
        const info = await transporter.sendMail({
            from: process.env.EMAIL_ACCOUNT,
            to: 'heinrich.geiseb@mmltd.com.na',
            subject: `Order: ${req.body.OrderID}`,
            html
    });
        if (info) {
            res.status(201).send({ message: 'New Order Sent' })
        }
	
    } catch(err){
        res.status(401).send({
            message: err,
        });
    }
});
export default emailRouter;

import React from 'react'
import styled from 'styled-components'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const Container = styled.div`
	display: flex;
`
const Left = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	padding: 20px;
`
const Logo = styled.h1``
const Desc = styled.p`
	margin: 20px 0px;
`
const SocialContainer = styled.div`
	display: flex;
`
const SocialIcon = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	color: white;
	background-color: #${props => props.color};
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 20px;
`

const Center = styled.div`
	flex: 1;
	padding: 20px;
`

const Title = styled.h3`
	margin-bottom: 30px;
`

const List = styled.ul`
	margin: 0;
	padding: 0;
	list-style: none;
	display: flex;
	flex-wrap: wrap;
`

const ListItem = styled.li`
	width: 50%;
	margin-bottom: 15px;
`

const Right = styled.div`
	flex: 1;
	padding: 20px;
`

const ContactItem = styled.div`
	margin-bottom: 20px;
	display: flex;
	align-items: center;
`
const Footer = () => {
	return (
		<Container>
			<Left>
				<Logo>Gizbytes</Logo>
				<Desc>
					Lorem ipsum dolor sit amet, consectetur adipisicing, elit. Officiis suscipit necessitatibus ea ipsam odit ut quisquam doloremque, sed voluptatem ipsum porro explicabo nobis repudiandae perferendis perspiciatis nihil fugiat earum, tenetur?
				</Desc>
				<SocialContainer>
					<SocialIcon color="3B5999">
						<FacebookIcon/>
					</SocialIcon>
					<SocialIcon color="E4405F">
						<TwitterIcon/>
					</SocialIcon>
					<SocialIcon color="55ACEE">
						<InstagramIcon/>
					</SocialIcon>
				</SocialContainer>
			</Left>
			<Center>
				<Title>Useful Links</Title>
				<List>
					<ListItem>Home</ListItem>
					<ListItem>Cart</ListItem>
					<ListItem>Order Tracking</ListItem>
					<ListItem>Wishlist</ListItem>
					<ListItem>Terms</ListItem>
				</List>
			</Center>
			<Right>
				<Title>Contact</Title>
				<ContactItem><LocationOnIcon style={{marginRight:"10px"}}/>Barangay 69 Zone 6, Manila, Philippines</ContactItem>
				<ContactItem><LocalPhoneIcon style={{marginRight:"10px"}}/>+63996 969 6969</ContactItem>
				<ContactItem><MailOutlineIcon style={{marginRight:"10px"}}/>gizbytes@mail.com</ContactItem>
			</Right>
		</Container>
	)
}

export default Footer
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

dotenv.config();

class Server {
	private app = express();

	constructor() {
		this.initializeMiddleware();
	}

	private initializeMiddleware() {
		this.app.use(
			cors({
				origin: true,
				credentials: true,
			})
		);
		this.app.all('/*', (req: Request, res: Response, next: NextFunction) => {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', 'X-Requested-With');
			next();
		});
		this.app.set('port', process.env.PORT || 4000);
		this.app.use(helmet({ contentSecurityPolicy: false }));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cookieParser());
	}

	// server-listen
	public listen(): void {
		this.app.listen(this.app.get('port'), () => {
			console.log(
				`Scheduler Server is running on port ${this.app.get('port')}`
			);
		});
	}
}

try {
	const appServer = new Server();

	appServer.listen();
} catch (error) {
	console.error(error);
}

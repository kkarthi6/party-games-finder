interface GoogleUser {
  email: string;
  name: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
}

interface GoogleCredentialResponse {
  credential: string;
  select_by: string;
}

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          renderButton: (
            element: HTMLElement,
            config: {
              theme?: 'outline' | 'filled_blue' | 'filled_black';
              size?: 'large' | 'medium' | 'small';
              text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
              shape?: 'rectangular' | 'pill' | 'circle' | 'square';
              logo_alignment?: 'left' | 'center';
              width?: string;
              locale?: string;
            }
          ) => void;
          prompt: () => void;
          disableAutoSelect: () => void;
        };
      };
    };
  }
}

// Demo Google Client ID - In production, replace with your actual Google OAuth client ID
const GOOGLE_CLIENT_ID = "your-google-client-id.apps.googleusercontent.com";

export class GoogleAuthService {
  private static instance: GoogleAuthService;
  private isInitialized = false;
  private initPromise: Promise<void> | null = null;

  static getInstance(): GoogleAuthService {
    if (!GoogleAuthService.instance) {
      GoogleAuthService.instance = new GoogleAuthService();
    }
    return GoogleAuthService.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = new Promise((resolve, reject) => {
      // Check if Google Identity Services is loaded
      const checkGoogleLoaded = () => {
        if (window.google?.accounts?.id) {
          this.isInitialized = true;
          resolve();
        } else {
          setTimeout(checkGoogleLoaded, 100);
        }
      };

      // Start checking immediately
      checkGoogleLoaded();

      // Timeout after 10 seconds
      setTimeout(() => {
        if (!this.isInitialized) {
          reject(new Error('Google Identity Services failed to load'));
        }
      }, 10000);
    });

    return this.initPromise;
  }

  async signIn(): Promise<GoogleUser> {
    await this.initialize();

    return new Promise((resolve, reject) => {
      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (response: GoogleCredentialResponse) => {
            try {
              const userData = this.parseJWT(response.credential);
              resolve(userData);
            } catch (error) {
              reject(new Error('Failed to parse Google response'));
            }
          },
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        // Trigger the sign-in prompt
        window.google.accounts.id.prompt();
      } catch (error) {
        reject(new Error('Failed to initialize Google Sign-In'));
      }
    });
  }

  renderButton(element: HTMLElement, onSuccess: (user: GoogleUser) => void, onError: (error: string) => void): void {
    this.initialize().then(() => {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response: GoogleCredentialResponse) => {
          try {
            const userData = this.parseJWT(response.credential);
            onSuccess(userData);
          } catch (error) {
            onError('Failed to parse Google response');
          }
        },
      });

      window.google.accounts.id.renderButton(element, {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'rectangular',
        logo_alignment: 'left',
        width: '100%',
      });
    }).catch((error) => {
      onError('Failed to load Google Sign-In');
    });
  }

  private parseJWT(token: string): GoogleUser {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      const payload = JSON.parse(jsonPayload);
      
      return {
        email: payload.email,
        name: payload.name || payload.given_name || payload.email.split('@')[0],
        picture: payload.picture,
        given_name: payload.given_name,
        family_name: payload.family_name,
      };
    } catch (error) {
      throw new Error('Invalid JWT token');
    }
  }

  // Demo mode - simulates Google authentication for development
  async signInDemo(): Promise<GoogleUser> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      email: 'demo.user@gmail.com',
      name: 'Demo User',
      picture: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      given_name: 'Demo',
      family_name: 'User',
    };
  }
}

export const googleAuth = GoogleAuthService.getInstance();
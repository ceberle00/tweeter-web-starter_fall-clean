export interface View
{
    displayErrorMessage: (message: string, bootstrapClasses?: string | undefined) => string
}

export interface NavView extends View
{
    navigate: (message : string) => void
}

export interface isLoadingView extends View {
    setIsLoading : (value : boolean) => void
}

export interface MessageView extends View{
    displayInfoMessage: (message: string, duration: number, bootstrapClasses?: string | undefined) => string
    deleteMessage: (messageID: string) => void
}

export abstract class Presenter<V extends View> {
    private _view : V
    protected constructor(view : V) {
        this._view = view
    }
    protected get view() {
        return this._view;
    }
    public async doFailureReportingOperation(operation : () => void, message : string) {
        try {
            await operation()
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to ${message} because of exception: ${error}`
            );
        }
    };
    public async doFailureFinallyReportingOperation(operation : () => void, message : string, finallyOperation : () => void) {
        try {
            await operation()
        }
        catch (error) {
            this.view.displayErrorMessage(
                `Failed to ${message} because of exception: ${error}`
            );
        }
        finally {
            await finallyOperation();
            //always sets isLoading
        }
    };
}
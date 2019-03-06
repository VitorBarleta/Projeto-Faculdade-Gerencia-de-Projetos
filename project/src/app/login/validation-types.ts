export class ValidationTypes {
    public static Email = [
        {
            type: 'required',
            message: 'Email obrigatório.'
        },
        {
            type: 'email',
            message: 'Email inválido.'
        }
    ]

    public static Password = [
        {
            type: 'required',
            message: 'Senha obrigatória.'
        },
        {
            type: 'minlength',
            message: 'A senha deve ter no mínimo 8 caracteres.'
        }
    ]
}

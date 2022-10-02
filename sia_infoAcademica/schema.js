import { buildSchema } from "graphql"


/**
 * The GraphQL schema in string form
 * @type {GraphQLSchema} schema
 */
const schema = buildSchema(`
    type Query {
        user(username: String): User
    }
    type User {
        nombre_usuario: String
        nombre_completo: String
        documento_identidad: String
        lugar_expedicion: String
        sexo: String
        etnia: String
        email_personal: String
        email_institucional: String
        telefono_movil: String
        fecha_nacimiento: String
        lugar_nacimiento: String
        nacionalidad: String
        tipo_sangre: String
        eps: String
        situacion_militar: String
        responsables: [Responsable]
        vivienda: [Vivienda]
    }
    type Responsable {
        responsable_nombre: String
        responsable_tipo_doc: String
        responsable_numero_doc: String
        responsable_telefono: String
    }
    type Vivienda {
        vivienda_tipo: String
        vivienda_direccion: String
        vivienda_departamento: String
        vivienda_codigo_postal: String
        vivienda_telefono: String
        vivienda_estrato: String
    }
    input ViviendaInput {
        vivienda_tipo: String
        vivienda_direccion: String
        vivienda_departamento: String
        vivienda_codigo_postal: String
        vivienda_telefono: String
        vivienda_estrato: String
    }
    type Message {
        message: String
    }
    type Mutation {
        updateUser(
            nombre_usuario: String
            lugar_expedicion: String
            email_personal: String
            telefono_movil: String
            eps: String
            situacion_militar: String
            vivienda: [ViviendaInput]
        ): Message
    }
`)


export default schema

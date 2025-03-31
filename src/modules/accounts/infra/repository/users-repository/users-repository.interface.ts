import type {
	CreateUser,
	DeleteUser,
	GetUserByEmail,
	ReadUser,
	UpdateUser,
} from "./users-repository.types.js";

interface IUsersRepository {
	/**
	 * @description Método responsável por realizar a criação de um novo usuário no banco de dados
	 *
	 * @param name - Nome do usuário
	 * @param email - Email do usuário
	 * @param birthDate - Data de Nascimento do usuário
	 * @param idProvider - Id do Usuário no Respectivo Provedor

	 *
	 * @returns Retorna o schema completo do usuário
	 */
	createUser({
		name,
		email,
		birthDate,
		idProvider,
	}: CreateUser.Input): Promise<CreateUser.Output>;

	/**
	 * @description Método responsável por ler e trazer os dados de um usuário em específico
	 *
	 * @param id - Id do usuário a ser buscado no banco de dados
	 *
	 * @returns Retorna o schema completo do usuário
	 */
	readUser({ id }: ReadUser.Input): Promise<ReadUser.Output>;

	/**
	 * @description Método responsável por realizar alterações em um usuário no banco de dados
	 * @operational
	 * - Não é possível alterar as propriedades: `idProvider` e `Active`
	 *
	 * @param id - Id do usuário a ser alterado no banco de dados
	 * @param data - Dados a serem alterados no usuário
	 *
	 * @returns Sem retorno
	 */
	updateUser({ id, data }: UpdateUser.Input): Promise<UpdateUser.Output>;

	/**
	 * @description Método responsável por realizar soft-delete em um usuário no banco de dados
	 * @operational
	 * - Será alterada a propriedade `Active` do usuário, setando para `falsy`
	 *
	 * @param id - Id do usuário a ser alterado no banco de dados
	 *
	 * @returns Sem retorno
	 */
	deleteUser({ id }: DeleteUser.Input): Promise<DeleteUser.Output>;

	/**
	 * @description Método responsável por buscar um usuário por email
	 *
	 * @param email - Email do usuário a ser encontrado
	 *
	 * @returns Schema de retorno do usuário
	 */
	getUserByEmail({
		email,
	}: GetUserByEmail.Input): Promise<GetUserByEmail.Output>;
}

export type { IUsersRepository };

import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionDTO): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome') {
      if (balance.total < value) {
        throw Error(
          'should not be able to create outcome transaction without a valid balance',
        );
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });
    return transaction;
  }
}

export default CreateTransactionService;

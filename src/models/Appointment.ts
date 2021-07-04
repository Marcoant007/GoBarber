import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne, JoinColumn } from 'typeorm'
import User from './User';
@Entity('appointments') // esse decorator quer dizer que a classe é um parametro que estamos passando para entidade
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider_id: string;

    @ManyToOne(() => User)
    @JoinColumn({name: 'provider_id'})
    provider: User;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
export default Appointment;

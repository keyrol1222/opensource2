import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './employee.entity';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  //get all employees
  @Get()
  async findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  //get employee by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Employee> {
    const employee = await this.employeeService.findOne(id);
    if (!employee) {
      throw new NotFoundException('El empleado no existe!');
    } else {
      return employee;
    }
  }

  //create employee
  @Post()
  async create(@Body() employee: Employee): Promise<Employee> {
    return this.employeeService.create(employee);
  }

  //update employee
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() employee: Employee,
  ): Promise<any> {
    return this.employeeService.update(id, employee);
  }

  //delete employee
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if employee does not exist
    const employee = await this.employeeService.findOne(id);
    if (!employee) {
      throw new NotFoundException('El empleado no existe!');
    }
    return this.employeeService.delete(id);
  }

  //validate employee
  @Post('/login')
  async validateEmployee(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<Employee> {
    const employee = await this.employeeService.validateEmployee(
      email,
      password,
    );
    if (!employee) {
      throw new NotFoundException('Credenciales incorrectas');
    } else {
      return employee;
    }
  }
}
